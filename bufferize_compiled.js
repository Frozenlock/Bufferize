if(!lt.util.load.provided_QMARK_('lt.plugins.bufferize')) {
goog.provide('lt.plugins.bufferize');
goog.require('cljs.core');
goog.require('lt.objs.context');
goog.require('lt.objs.context');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
goog.require('lt.objs.tabs');
goog.require('lt.objs.tabs');
/**
* Return the current window.
*/
lt.plugins.bufferize.current_window = (function current_window(){return lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",4427500575));
});
lt.plugins.bufferize.current_buffer = (function current_buffer(){return lt.objs.tabs.active_tab.call(null);
});
lt.plugins.bufferize.get_windows = (function get_windows(){return new cljs.core.Keyword(null,"tabsets","tabsets",3756175576).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi));
});
lt.plugins.bufferize.other_windows = (function other_windows(){var temp__4092__auto__ = lt.plugins.bufferize.current_window.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var cur_w = temp__4092__auto__;return cljs.core.filter.call(null,(function (p1__8970_SHARP_){return cljs.core.not_EQ_.call(null,cur_w,p1__8970_SHARP_);
}),lt.plugins.bufferize.get_windows.call(null));
} else
{return null;
}
});
lt.plugins.bufferize.next_window = (function next_window(cur){var windows = lt.plugins.bufferize.get_windows.call(null);var or__6755__auto__ = cljs.core.second.call(null,cljs.core.drop_while.call(null,(function (p1__8971_SHARP_){return cljs.core.not_EQ_.call(null,cur,p1__8971_SHARP_);
}),windows));if(cljs.core.truth_(or__6755__auto__))
{return or__6755__auto__;
} else
{return cljs.core.last.call(null,cljs.core.drop_while.call(null,(function (p1__8972_SHARP_){return cljs.core.not_EQ_.call(null,cur,p1__8972_SHARP_);
}),cljs.core.reverse.call(null,windows)));
}
});
/**
* Move the current tab to another window (tabset).
*/
lt.plugins.bufferize.move_to_window = (function() {
var move_to_window = null;
var move_to_window__0 = (function (){return move_to_window.call(null,null);
});
var move_to_window__1 = (function (dest_w){var temp__4092__auto__ = lt.plugins.bufferize.current_window.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var cw = temp__4092__auto__;var cur = lt.plugins.bufferize.current_buffer.call(null);var next = (function (){var or__6755__auto__ = dest_w;if(cljs.core.truth_(or__6755__auto__))
{return or__6755__auto__;
} else
{return lt.plugins.bufferize.next_window.call(null,cw);
}
})();if(cljs.core.truth_((function (){var and__6743__auto__ = cur;if(cljs.core.truth_(and__6743__auto__))
{var and__6743__auto____$1 = next;if(cljs.core.truth_(and__6743__auto____$1))
{return cljs.core.not_EQ_.call(null,next,cw);
} else
{return and__6743__auto____$1;
}
} else
{return and__6743__auto__;
}
})()))
{lt.objs.tabs.rem_BANG_.call(null,cur);
lt.objs.tabs.add_BANG_.call(null,cur,next);
return lt.objs.tabs.active_BANG_.call(null,cur);
} else
{return null;
}
} else
{return null;
}
});
move_to_window = function(dest_w){
switch(arguments.length){
case 0:
return move_to_window__0.call(this);
case 1:
return move_to_window__1.call(this,dest_w);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
move_to_window.cljs$core$IFn$_invoke$arity$0 = move_to_window__0;
move_to_window.cljs$core$IFn$_invoke$arity$1 = move_to_window__1;
return move_to_window;
})()
;
/**
* Create a new window and send the current tab in it.
*/
lt.plugins.bufferize.split_window_right = (function split_window_right(){var w = lt.objs.tabs.spawn_tabset.call(null);lt.objs.tabs.equalize_tabset_widths.call(null);
return lt.plugins.bufferize.move_to_window.call(null,w);
});
/**
* Destroy the given window (tabset).
*/
lt.plugins.bufferize.delete_window = (function delete_window(w){return lt.objs.tabs.rem_tabset.call(null,w,true);
});
/**
* Move all the tabs to the previous tabset and destroy the current window. Do nothing if there's only one window.
*/
lt.plugins.bufferize.delete_current_window = (function delete_current_window(){var temp__4092__auto__ = lt.plugins.bufferize.current_window.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ts = temp__4092__auto__;return lt.plugins.bufferize.delete_window.call(null,ts);
} else
{return null;
}
});
lt.plugins.bufferize.delete_other_windows = (function delete_other_windows(){while(true){
if(cljs.core.seq.call(null,lt.plugins.bufferize.other_windows.call(null)))
{var cur_8973 = lt.plugins.bufferize.current_buffer.call(null);lt.plugins.bufferize.delete_window.call(null,cljs.core.first.call(null,lt.plugins.bufferize.other_windows.call(null)));
lt.objs.tabs.active_BANG_.call(null,cur_8973);
{
continue;
}
} else
{return null;
}
break;
}
});
lt.plugins.bufferize.kill_buffer = (function kill_buffer(){var w = lt.plugins.bufferize.current_window.call(null);new cljs.core.Keyword(null,"exec","exec",1017031683).cljs$core$IFn$_invoke$arity$1(lt.objs.command.by_id.call(null,new cljs.core.Keyword(null,"tabs.close","tabs.close",4150844154))).call(null);
if(cljs.core._EQ_.call(null,0,new cljs.core.Keyword(null,"count","count",1108755585).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,w))))
{return lt.plugins.bufferize.delete_window.call(null,w);
} else
{return null;
}
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.bufferize","split-window-right","lt.plugins.bufferize/split-window-right",2686916924),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Add another window.",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.bufferize.split_window_right.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.bufferize","delete-window","lt.plugins.bufferize/delete-window",4002340796),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Remove current window.",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.bufferize.delete_current_window.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.bufferize","delete-other-windows","lt.plugins.bufferize/delete-other-windows",1640550926),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Keep only the current window.",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.bufferize.delete_other_windows.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.bufferize","kill-buffer","lt.plugins.bufferize/kill-buffer",4634549625),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Kill current buffer.",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.bufferize.kill_buffer.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.bufferize","switch-buffer","lt.plugins.bufferize/switch-buffer",1549563171),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Switch to next buffer in the current window.",new cljs.core.Keyword(null,"exec","exec",1017031683),new cljs.core.Keyword(null,"exec","exec",1017031683).cljs$core$IFn$_invoke$arity$1(lt.objs.command.by_id.call(null,new cljs.core.Keyword(null,"tabs.next","tabs.next",3470721749)))], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.bufferize","send-buffer-next-window","lt.plugins.bufferize/send-buffer-next-window",1178515916),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Send current buffer to next window.",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.bufferize.move_to_window.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.bufferize","other-window","lt.plugins.bufferize/other-window",870204663),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Focus on the next window.",new cljs.core.Keyword(null,"exec","exec",1017031683),new cljs.core.Keyword(null,"exec","exec",1017031683).cljs$core$IFn$_invoke$arity$1(lt.objs.command.by_id.call(null,new cljs.core.Keyword(null,"tabset.next","tabset.next",1472250630)))], null));
}

//# sourceMappingURL=bufferize_compiled.js.map