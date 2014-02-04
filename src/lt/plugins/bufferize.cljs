(ns lt.plugins.Bufferize
  (:require [lt.objs.tabs :as tabs]
            [lt.objs.command :as cmd]
            [lt.object :as object]
            [lt.objs.context :as ctx]))

;; Unfortunately, LT doesn't have the same buffer architecture as Emacs.
;; To minimize the changes, the 'buffers' will be the tabs and the 'windows', the tabsets.


(defn move-to-window
  "Move the current tab to another window (tabset). Sends to the NEXT window, unless given an argument."
  ([] (move-to-window false))
  ([prev?]
   (when-let [ts (ctx/->obj :tabset)]
     (let [cur (@ts :active-obj)
           next (if prev?
                  (or (tabs/prev-tabset ts) (tabs/next-tabset ts))
                  (or (tabs/next-tabset ts) (tabs/prev-tabset ts)))]
       (when (and cur next (not= next ts))
         (tabs/rem! cur)
         (tabs/add! cur next)
         (tabs/active! cur))))))


(defn split-window-right
  "Create a new window and send the current tab in it."[]
  (tabs/spawn-tabset)
  (tabs/equalize-tabset-widths)
  (move-to-window))


(defn delete-window
  "Move all the tabs to the previous tabset and destroy the current window. Do nothing if there's only one window." []
  (when-let [ts (ctx/->obj :tabset)]
      (tabs/rem-tabset ts true)))



(cmd/command {:command ::split-window-right
              :desc "Bufferize: Add another window."
              :exec (fn []
                      (split-window-right))})

(cmd/command {:command ::delete-window
              :desc "Bufferize: Remove current window."
              :exec (fn []
                      (delete-window))})

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
