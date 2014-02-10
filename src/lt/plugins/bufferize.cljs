(ns lt.plugins.bufferize
  (:require [lt.objs.document :as doc]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.metrics :as metrics]
            [lt.objs.files :as files]
            [lt.objs.tabs :as tabs]
            [lt.objs.command :as cmd]
            [lt.object :as object]
            [lt.objs.context :as ctx]))

;; Unfortunately, LT (CodeMirror) doesn't have the same buffer architecture as Emacs.
;; To minimize the changes, the 'buffers' will be the tabs and the 'windows', the tabsets.


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;; Create linked tabs ;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


;;; Linked documents is CodeMirror's way of editing the same document in multiple places.
;;; This should be enough to get us 'near enough' the buffer architecture (at least from a user POV).
;;; While linked documents are created and linked like trees, here we will try to create them
;;; from a unique root document. This should make it easier to avoid getting orphaned documents
;;; when closing duplicate buffers.


;;; Linked documents take the form of a tree.
;;; Here we try to get a list of all of them.

(defn find-top-root-doc
  "Find the root document." [doc]
  (let [root (:root @doc)]
    (if root (or (find-top-root-doc root)
                 root)
      doc)))


(defn current-tab []
  (tabs/active-tab))

(defn tab->doc
  "Get the document from a tab" [tab]
  (-> tab
      deref
      :doc))


;; this function in lt.objs.document seems to be bugged (or I can't figure out how to use it).
(defn create-sub
  ([doc] (create-sub doc nil))
  ([doc info]
   (let [neue (doc/create (merge (select-keys @doc doc-keys) info {:doc (doc/linked* doc info)
                                                                   :root doc}))]
     (object/add-tags neue [:document.linked])
     (object/update! doc [:sub-docs] conj neue)
     neue)))

(defn create-sub-from-root
  ([doc] (create-sub-from-root doc nil))
  ([doc info] (create-sub (find-top-root-doc doc) info)))

(defn linked-doc-from-tab
  "Create a linked doc from a tab" [tab]
  (let [info (-> tab deref :info)]
    (create-sub-from-root (tab->doc tab) info)))


(defn create-linked-editor
  "Create an editor with a document linked to the the provided tab's document." [tab]
  (let [info (-> tab deref :info)
        path  (:path info)
        type (files/path->type path)
        doc (linked-doc-from-tab tab)
        ed (pool/create (merge {:doc doc :line-ending (-> @doc :line-ending)} info))]
    (object/add-tags ed [:editor.file-backed])
    ;(tabs/active! ed)
    ))




;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;; buffers and windows ;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;; I'm still not sure if it's a good idea to provide Emacs-like function name
;;; (buffers and windows instead of tabs and tabsets).

(defn current-window
  "Return the current window (tabset)." []
  (ctx/->obj :tabset))


(defn current-buffer
  "Return the current buffer (tab)."[]
  (tabs/active-tab))


(defn window->buffers [w]
  (:objs @w))


(defn linked-buffer
  "Create a linked buffer. Must be attached to a window and activated"
  [buffer]
  (create-linked-editor buffer))


(defn get-windows
  "Return a list of all windows (tabsets)."[]
  (:tabsets (deref tabs/multi)))


(defn all-windows->buffers []
  (mapcat window->buffers (get-windows)))


(defn same-doc?
  "Find if the buffers are linked to the same document."
  [b1 b2 & r]
  (let [buffers (concat [b1 b2] r)]
    (->> (map #(when-let [d (tab->doc %)]
                 (find-top-root-doc d)) buffers)
         (apply =))))


(defn remove-dup-in-window
  "Remove all the other buffers (in the same window) linked to the same document."
  [buffer window]
  (doseq [b (->> (window->buffers window)
                 (remove #(= buffer %)))]
    (when (same-doc? buffer b)
      (tabs/rem! b))))


(defn other-windows
  "Return all windows except the current one."[]
  (when-let [cur-w (current-window)]
    (filter #(not= cur-w %) (get-windows))))


(defn previous-window
  "Select the 'previous' window.
   Will select the last if the current is the first."[cur]
  (let [windows (get-windows)]
    (or (second (drop-while #(not= cur %) (reverse windows)))
        (last (drop-while #(not= cur %) windows)))))

(defn next-window
  "Select the 'next' window.
   Will select the first if the current is the last."[cur]
  (let [windows (get-windows)]
    (or (second (drop-while #(not= cur %) windows))
        (last (drop-while #(not= cur %) (reverse windows))))))


(defn move-to-window
  "Move the current buffer to another window (tabset)."
  [buffer dest-w]
  (tabs/rem! buffer)
  (tabs/add! buffer dest-w))

(defn move-current-buffer-to-window
  "Move the current buffer to another window (tabset)."
  ([] (move-current-buffer-to-window nil))
  ([dest-w]
   (when-let [cw (current-window)]
     (let [cur (current-buffer)
           next (or dest-w (next-window cw))]
       (when (and cur next (not= next cw))
         (move-to-window cur next)
         (tabs/active! cur))))))


(defn split-window-right
  "Create a new window and send the current tab in it."[]
  (let [w (tabs/spawn-tabset)
        cur-tab (current-buffer)
        lb (linked-buffer cur-tab)]
    (tabs/equalize-tabset-widths)
    (move-to-window lb w)
    (tabs/active! lb) ;; must be activated once to be seen. (?!)
    (tabs/active! cur-tab)))


(defn delete-window
  "Destroy the given window (tabset)."[w]
  (tabs/rem-tabset w true))


(defn delete-current-window
  "Move all the tabs to the previous tabset and destroy the current window. Do nothing if there's only one window." []
  (when-let [ts (current-window)]
    (delete-window ts)))


(defn delete-other-windows []
  (while (seq (other-windows))
    (let [cur (current-buffer)]
      (delete-window (first (other-windows)))
    (tabs/active! cur))))


(defn kill-buffer []
  (let [w (current-window)]
    ((:exec (cmd/by-id :tabs.close)))
    (when (< 1 (count (window->buffers w)))
      (delete-window w))))

(cmd/command {:command ::split-window-right
              :desc "Bufferize: Add another window."
              :exec (fn []
                      (split-window-right))})

(cmd/command {:command ::delete-window
              :desc "Bufferize: Remove current window."
              :exec (fn []
                      (delete-current-window))})

(cmd/command {:command ::delete-other-windows
              :desc "Bufferize: Keep only the current window."
              :exec (fn []
                      (delete-other-windows))})

(cmd/command {:command ::kill-buffer
              :desc "Bufferize: Kill current buffer."
              :exec (fn []
                      (kill-buffer))})

(cmd/command {:command ::switch-buffer
              :desc "Bufferize: Switch to next buffer in the current window."
              :exec (:exec (cmd/by-id :tabs.next))})

(cmd/command {:command ::send-buffer-next-window
              :desc "Bufferize: Send

current buffer to next window."
              :exec (fn []
                      (move-current-buffer-to-window))})

(cmd/command {:command ::other-window
              :desc "Bufferize: Focus on the next window."
              :exec (:exec (cmd/by-id :tabset.next))})
