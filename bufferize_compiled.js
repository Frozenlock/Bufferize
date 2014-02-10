if(!lt.util.load.provided_QMARK_('lt.plugins.bufferize')) {
goog.provide('lt.plugins.bufferize');
goog.require('cljs.core');
goog.require('lt.objs.files');
goog.require('lt.objs.context');
goog.require('lt.objs.tabs');
goog.require('lt.objs.metrics');
goog.require('lt.objs.context');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.objs.files');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.tabs');
goog.require('lt.objs.editor');
goog.require('lt.objs.metrics');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.objs.document');
goog.require('lt.objs.document');
/**
* Find the root document.
*/
lt.plugins.bufferize.find_top_root_doc = (function find_top_root_doc(doc){var root = new cljs.core.Keyword(null,"root","root",1017410644).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,doc));if(cljs.core.truth_(root))
{var or__6755__auto__ = find_top_root_doc.call(null,root);if(cljs.core.truth_(or__6755__auto__))
{return or__6755__auto__;
} else
{return root;
}
} else
{return doc;
}
});
lt.plugins.bufferize.current_tab = (function current_tab(){return lt.objs.tabs.active_tab.call(null);
});
/**
* Get the document from a tab
*/
lt.plugins.bufferize.tab__GT_doc = (function tab__GT_doc(tab){return new cljs.core.Keyword(null,"doc","doc",1014003882).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,tab));
});
lt.plugins.bufferize.create_sub = (function() {
var create_sub = null;
var create_sub__1 = (function (doc){return create_sub.call(null,doc,null);
});
var create_sub__2 = (function (doc,info){var neue = lt.objs.document.create.call(null,cljs.core.merge.call(null,cljs.core.select_keys.call(null,cljs.core.deref.call(null,doc),lt.plugins.bufferize.doc_keys),info,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",1014003882),lt.objs.document.linked_STAR_.call(null,doc,info),new cljs.core.Keyword(null,"root","root",1017410644),doc], null)));lt.object.add_tags.call(null,neue,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"document.linked","document.linked",3550087614)], null));
lt.object.update_BANG_.call(null,doc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub-docs","sub-docs",3182649626)], null),cljs.core.conj,neue);
return neue;
});
create_sub = function(doc,info){
switch(arguments.length){
case 1:
return create_sub__1.call(this,doc);
case 2:
return create_sub__2.call(this,doc,info);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
create_sub.cljs$core$IFn$_invoke$arity$1 = create_sub__1;
create_sub.cljs$core$IFn$_invoke$arity$2 = create_sub__2;
return create_sub;
})()
;
lt.plugins.bufferize.create_sub_from_root = (function() {
var create_sub_from_root = null;
var create_sub_from_root__1 = (function (doc){return create_sub_from_root.call(null,doc,null);
});
var create_sub_from_root__2 = (function (doc,info){return lt.plugins.bufferize.create_sub.call(null,lt.plugins.bufferize.find_top_root_doc.call(null,doc),info);
});
create_sub_from_root = function(doc,info){
switch(arguments.length){
case 1:
return create_sub_from_root__1.call(this,doc);
case 2:
return create_sub_from_root__2.call(this,doc,info);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
create_sub_from_root.cljs$core$IFn$_invoke$arity$1 = create_sub_from_root__1;
create_sub_from_root.cljs$core$IFn$_invoke$arity$2 = create_sub_from_root__2;
return create_sub_from_root;
})()
;
/**
* Create a linked doc from a tab
*/
lt.plugins.bufferize.linked_doc_from_tab = (function linked_doc_from_tab(tab){var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,tab));return lt.plugins.bufferize.create_sub_from_root.call(null,lt.plugins.bufferize.tab__GT_doc.call(null,tab),info);
});
/**
* Create an editor with a document linked to the the provided tab's document.
*/
lt.plugins.bufferize.create_linked_editor = (function create_linked_editor(tab){var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,tab));var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(info);var type = lt.objs.files.path__GT_type.call(null,path);var doc = lt.plugins.bufferize.linked_doc_from_tab.call(null,tab);var ed = lt.objs.editor.pool.create.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",1014003882),doc,new cljs.core.Keyword(null,"line-ending","line-ending",4015468690),new cljs.core.Keyword(null,"line-ending","line-ending",4015468690).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,doc))], null),info));return lt.object.add_tags.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.file-backed","editor.file-backed",4684256680)], null));
});
/**
* Return the current window (tabset).
*/
lt.plugins.bufferize.current_window = (function current_window(){return lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",4427500575));
});
/**
* Return the current buffer (tab).
*/
lt.plugins.bufferize.current_buffer = (function current_buffer(){return lt.objs.tabs.active_tab.call(null);
});
lt.plugins.bufferize.window__GT_buffers = (function window__GT_buffers(w){return new cljs.core.Keyword(null,"objs","objs",1017308622).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,w));
});
/**
* Create a linked buffer. Must be attached to a window and activated
*/
lt.plugins.bufferize.linked_buffer = (function linked_buffer(buffer){return lt.plugins.bufferize.create_linked_editor.call(null,buffer);
});
/**
* Return a list of all windows (tabsets).
*/
lt.plugins.bufferize.get_windows = (function get_windows(){return new cljs.core.Keyword(null,"tabsets","tabsets",3756175576).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi));
});
lt.plugins.bufferize.all_windows__GT_buffers = (function all_windows__GT_buffers(){return cljs.core.mapcat.call(null,lt.plugins.bufferize.window__GT_buffers,lt.plugins.bufferize.get_windows.call(null));
});
/**
* Find if the buffers are linked to the same document.
* @param {...*} var_args
*/
lt.plugins.bufferize.same_doc_QMARK_ = (function() { 
var same_doc_QMARK___delegate = function (b1,b2,r){var buffers = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [b1,b2], null),r);return cljs.core.apply.call(null,cljs.core._EQ_,cljs.core.map.call(null,(function (p1__8091_SHARP_){var temp__4092__auto__ = lt.plugins.bufferize.tab__GT_doc.call(null,p1__8091_SHARP_);if(cljs.core.truth_(temp__4092__auto__))
{var d = temp__4092__auto__;return lt.plugins.bufferize.find_top_root_doc.call(null,d);
} else
{return null;
}
}),buffers));
};
var same_doc_QMARK_ = function (b1,b2,var_args){
var r = null;if (arguments.length > 2) {
  r = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return same_doc_QMARK___delegate.call(this,b1,b2,r);};
same_doc_QMARK_.cljs$lang$maxFixedArity = 2;
same_doc_QMARK_.cljs$lang$applyTo = (function (arglist__8116){
var b1 = cljs.core.first(arglist__8116);
arglist__8116 = cljs.core.next(arglist__8116);
var b2 = cljs.core.first(arglist__8116);
var r = cljs.core.rest(arglist__8116);
return same_doc_QMARK___delegate(b1,b2,r);
});
same_doc_QMARK_.cljs$core$IFn$_invoke$arity$variadic = same_doc_QMARK___delegate;
return same_doc_QMARK_;
})()
;
/**
* Remove all the other buffers (in the same window) linked to the same document.
*/
lt.plugins.bufferize.remove_dup_in_window = (function remove_dup_in_window(buffer,window){var seq__8097 = cljs.core.seq.call(null,cljs.core.remove.call(null,(function (p1__8092_SHARP_){return cljs.core._EQ_.call(null,buffer,p1__8092_SHARP_);
}),lt.plugins.bufferize.window__GT_buffers.call(null,window)));var chunk__8098 = null;var count__8099 = 0;var i__8100 = 0;while(true){
if((i__8100 < count__8099))
{var b = cljs.core._nth.call(null,chunk__8098,i__8100);if(cljs.core.truth_(lt.plugins.bufferize.same_doc_QMARK_.call(null,buffer,b)))
{lt.objs.tabs.rem_BANG_.call(null,b);
} else
{}
{
var G__8117 = seq__8097;
var G__8118 = chunk__8098;
var G__8119 = count__8099;
var G__8120 = (i__8100 + 1);
seq__8097 = G__8117;
chunk__8098 = G__8118;
count__8099 = G__8119;
i__8100 = G__8120;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__8097);if(temp__4092__auto__)
{var seq__8097__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8097__$1))
{var c__7497__auto__ = cljs.core.chunk_first.call(null,seq__8097__$1);{
var G__8121 = cljs.core.chunk_rest.call(null,seq__8097__$1);
var G__8122 = c__7497__auto__;
var G__8123 = cljs.core.count.call(null,c__7497__auto__);
var G__8124 = 0;
seq__8097 = G__8121;
chunk__8098 = G__8122;
count__8099 = G__8123;
i__8100 = G__8124;
continue;
}
} else
{var b = cljs.core.first.call(null,seq__8097__$1);if(cljs.core.truth_(lt.plugins.bufferize.same_doc_QMARK_.call(null,buffer,b)))
{lt.objs.tabs.rem_BANG_.call(null,b);
} else
{}
{
var G__8125 = cljs.core.next.call(null,seq__8097__$1);
var G__8126 = null;
var G__8127 = 0;
var G__8128 = 0;
seq__8097 = G__8125;
chunk__8098 = G__8126;
count__8099 = G__8127;
i__8100 = G__8128;
continue;
}
}
} else
{return null;
}
}
break;
}
});
/**
* Return all windows except the current one.
*/
lt.plugins.bufferize.other_windows = (function other_windows(){var temp__4092__auto__ = lt.plugins.bufferize.current_window.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var cur_w = temp__4092__auto__;return cljs.core.filter.call(null,(function (p1__8101_SHARP_){return cljs.core.not_EQ_.call(null,cur_w,p1__8101_SHARP_);
}),lt.plugins.bufferize.get_windows.call(null));
} else
{return null;
}
});
/**
* Select the 'previous' window.
* Will select the last if the current is the first.
*/
lt.plugins.bufferize.previous_window = (function previous_window(cur){var windows = lt.plugins.bufferize.get_windows.call(null);var or__6755__auto__ = cljs.core.second.call(null,cljs.core.drop_while.call(null,(function (p1__8102_SHARP_){return cljs.core.not_EQ_.call(null,cur,p1__8102_SHARP_);
}),cljs.core.reverse.call(null,windows)));if(cljs.core.truth_(or__6755__auto__))
{return or__6755__auto__;
} else
{return cljs.core.last.call(null,cljs.core.drop_while.call(null,(function (p1__8103_SHARP_){return cljs.core.not_EQ_.call(null,cur,p1__8103_SHARP_);
}),windows));
}
});
/**
* Select the 'next' window.
* Will select the first if the current is the last.
*/
lt.plugins.bufferize.next_window = (function next_window(cur){var windows = lt.plugins.bufferize.get_windows.call(null);var or__6755__auto__ = cljs.core.second.call(null,cljs.core.drop_while.call(null,(function (p1__8104_SHARP_){return cljs.core.not_EQ_.call(null,cur,p1__8104_SHARP_);
}),windows));if(cljs.core.truth_(or__6755__auto__))
{return or__6755__auto__;
} else
{return cljs.core.last.call(null,cljs.core.drop_while.call(null,(function (p1__8105_SHARP_){return cljs.core.not_EQ_.call(null,cur,p1__8105_SHARP_);
}),cljs.core.reverse.call(null,windows)));
}
});
/**
* Move the current buffer to another window (tabset).
*/
lt.plugins.bufferize.move_to_window = (function move_to_window(buffer,dest_w){lt.objs.tabs.rem_BANG_.call(null,buffer);
return lt.objs.tabs.add_BANG_.call(null,buffer,dest_w);
});
/**
* Move the current buffer to another window (tabset).
*/
lt.plugins.bufferize.move_current_buffer_to_window = (function() {
var move_current_buffer_to_window = null;
var move_current_buffer_to_window__0 = (function (){return move_current_buffer_to_window.call(null,null);
});
var move_current_buffer_to_window__1 = (function (dest_w){var temp__4092__auto__ = lt.plugins.bufferize.current_window.call(null);if(cljs.core.truth_(temp__4092__auto__))
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
{lt.plugins.bufferize.move_to_window.call(null,cur,next);
return lt.objs.tabs.active_BANG_.call(null,cur);
} else
{return null;
}
} else
{return null;
}
});
move_current_buffer_to_window = function(dest_w){
switch(arguments.length){
case 0:
return move_current_buffer_to_window__0.call(this);
case 1:
return move_current_buffer_to_window__1.call(this,dest_w);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
move_current_buffer_to_window.cljs$core$IFn$_invoke$arity$0 = move_current_buffer_to_window__0;
move_current_buffer_to_window.cljs$core$IFn$_invoke$arity$1 = move_current_buffer_to_window__1;
return move_current_buffer_to_window;
})()
;
/**
* Create a new window and send the current tab in it.
*/
lt.plugins.bufferize.split_window_right = (function split_window_right(){var w = lt.objs.tabs.spawn_tabset.call(null);var cur_tab = lt.plugins.bufferize.current_buffer.call(null);var lb = lt.plugins.bufferize.linked_buffer.call(null,cur_tab);lt.objs.tabs.equalize_tabset_widths.call(null);
lt.plugins.bufferize.move_to_window.call(null,lb,w);
lt.objs.tabs.active_BANG_.call(null,lb);
return lt.objs.tabs.active_BANG_.call(null,cur_tab);
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
{var cur_8129 = lt.plugins.bufferize.current_buffer.call(null);lt.plugins.bufferize.delete_window.call(null,cljs.core.first.call(null,lt.plugins.bufferize.other_windows.call(null)));
lt.objs.tabs.active_BANG_.call(null,cur_8129);
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
if((1 < cljs.core.count.call(null,lt.plugins.bufferize.window__GT_buffers.call(null,w))))
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.bufferize","send-buffer-next-window","lt.plugins.bufferize/send-buffer-next-window",1178515916),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Send\n\ncurrent buffer to next window.",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.bufferize.move_current_buffer_to_window.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.bufferize","other-window","lt.plugins.bufferize/other-window",870204663),new cljs.core.Keyword(null,"desc","desc",1016984067),"Bufferize: Focus on the next window.",new cljs.core.Keyword(null,"exec","exec",1017031683),new cljs.core.Keyword(null,"exec","exec",1017031683).cljs$core$IFn$_invoke$arity$1(lt.objs.command.by_id.call(null,new cljs.core.Keyword(null,"tabset.next","tabset.next",1472250630)))], null));
}

//# sourceMappingURL=bufferize_compiled.js.map