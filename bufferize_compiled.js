if(!lt.util.load.provided_QMARK_('lt.plugins.Bufferize')) {
goog.provide('lt.plugins.Bufferize');
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
* Move the current tab to another window (tabset). Sends to the NEXT window, unless given an argument.
*/
lt.plugins.Bufferize.move_to_window = (function() {
var move_to_window = null;
var move_to_window__0 = (function (){return move_to_window.call(null,false);
});
var move_to_window__1 = (function (prev_QMARK_){var temp__4092__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",4427500575));if(cljs.core.truth_(temp__4092__auto__))
{var ts = temp__4092__auto__;var cur = cljs.core.deref.call(null,ts).call(null,new cljs.core.Keyword(null,"active-obj","active-obj",3056705826));var next = (cljs.core.truth_(prev_QMARK_)?(function (){var or__6755__auto__ = lt.objs.tabs.prev_tabset.call(null,ts);if(cljs.core.truth_(or__6755__auto__))
{return or__6755__auto__;
} else
{return lt.objs.tabs.next_tabset.call(null,ts);
}
})():(function (){var or__6755__auto__ = lt.objs.tabs.next_tabset.call(null,ts);if(cljs.core.truth_(or__6755__auto__))
{return or__6755__auto__;
} else
{return lt.objs.tabs.prev_tabset.call(null,ts);
}
})());if(cljs.core.truth_((function (){var and__6743__auto__ = cur;if(cljs.core.truth_(and__6743__auto__))
{var and__6743__auto____$1 = next;if(cljs.core.truth_(and__6743__auto____$1))
{return cljs.core.not_EQ_.call(null,next,ts);
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
move_to_window = function(prev_QMARK_){
switch(arguments.length){
case 0:
return move_to_window__0.call(this);
case 1:
return move_to_window__1.call(this,prev_QMARK_);
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
lt.plugins.Bufferize.split_window_right = (function split_window_right(){lt.objs.tabs.spawn_tabset.call(null);
lt.objs.tabs.equalize_tabset_widths.call(null);
return lt.plugins.Bufferize.move_to_window.call(null);
});
/**
* Move all the tabs to the previous tabset and destroy the current window. Do nothing if there's only one window.
*/
lt.plugins.Bufferize.delete_window = (function delete_window(){var temp__4092__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",4427500575));if(cljs.core.truth_(temp__4092__auto__))
{var ts = temp__4092__auto__;return lt.objs.tabs.rem_tabset.call(null,ts,true);
} else
{return null;
}
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.Bufferize","split-window-right","lt.plugins.Bufferize/split-window-right",768407892),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Add another window.",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.Bufferize.split_window_right.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.Bufferize","delete-window","lt.plugins.Bufferize/delete-window",2108948436),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Remove current window.",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.Bufferize.delete_window.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.Bufferize","switch-buffer","lt.plugins.Bufferize/switch-buffer",3412432123),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Switch to next buffer in the current window.",new cljs.core.Keyword(null,"exec","exec",1017031683),new cljs.core.Keyword(null,"exec","exec",1017031683).cljs$core$IFn$_invoke$arity$1(lt.objs.command.by_id.call(null,new cljs.core.Keyword(null,"tabs.next","tabs.next",3470721749)))], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.Bufferize","send-buffer-next-window","lt.plugins.Bufferize/send-buffer-next-window",3309574628),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Send current buffer to next window.",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.Bufferize.move_to_window.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.Bufferize","other-window","lt.plugins.Bufferize/other-window",2984486095),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Focus on the next window.",new cljs.core.Keyword(null,"exec","exec",1017031683),new cljs.core.Keyword(null,"exec","exec",1017031683).cljs$core$IFn$_invoke$arity$1(lt.objs.command.by_id.call(null,new cljs.core.Keyword(null,"tabset.next","tabset.next",1472250630)))], null));
}

//# sourceMappingURL=bufferize_compiled.js.map