(ns lt.plugins.bufferize
  (:require [lt.objs.tabs :as tabs]
            [lt.objs.command :as cmd]
            [lt.object :as object]
            [lt.objs.context :as ctx]))

;; Unfortunately, LT doesn't have the same buffer architecture as Emacs.
;; To minimize the changes, the 'buffers' will be the tabs and the 'windows', the tabsets.


(defn current-window
  "Return the current window." []
  (ctx/->obj :tabset))

(defn current-buffer []
  (tabs/active-tab))


(defn get-windows []
  (:tabsets (deref tabs/multi)))

(defn other-windows []
  (when-let [cur-w (current-window)]
    (filter #(not= cur-w %) (get-windows))))

(defn next-window [cur]
  (let [windows (get-windows)]
    (or (second (drop-while #(not= cur %) windows))
        (last (drop-while #(not= cur %) (reverse windows))))))


(defn move-to-window
  "Move the current tab to another window (tabset)."
  ([] (move-to-window nil))
  ([dest-w]
   (when-let [cw (current-window)]
     (let [cur (current-buffer)
           next (or dest-w (next-window cw))]
       (when (and cur next (not= next cw))
         (tabs/rem! cur)
         (tabs/add! cur next)
         (tabs/active! cur))))))


(defn split-window-right
  "Create a new window and send the current tab in it."[]
  (let [w (tabs/spawn-tabset)]
    (tabs/equalize-tabset-widths)
    (move-to-window w)))


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
  ((:exec (cmd/by-id :tabs.close))))


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
              :desc "Bufferize: Send current buffer to next window."
              :exec (fn []
                      (move-to-window))})

(cmd/command {:command ::other-window
              :desc "Bufferize: Focus on the next window."
              :exec (:exec (cmd/by-id :tabset.next))})
