JSAN.use('CKIT');
JSAN.use('Conditionals.Platform');
JSAN.use('Grid');
JSAN.use('Shape.Rect');
JSAN.use('Widget.DND');
JSAN.use('DOM.CoordUtils');
JSAN.use('YAHOO');
JSAN.use('YAHOO.util.StyleSheet');
JSAN.use('QEvent');
JSAN.use('wm._exe');
JSAN.use('wm.controller.main');
(new YAHOO.util.StyleSheet('.MenuBar{background-color:e4e5e6;}.MenuBar .MenuTop{float:left;height:100%;margin:0px 0px 0px 10px;padding:0px 8px 0px 8px;background-color:#e4e5e6;color:black;}.MenuBar .MenuTopActive{float:left;height:100%;margin:0px 0px 0px 10px;padding:2px 7px 0px 7px;border-left:1px solid #000000;border-right:1px solid #000000;background-color:#00a6ff;color:white;}.ContextMenu{border:1px solid #000000;padding-top:10px;padding-bottom:10px;background-color:#F6F6FF;color:black;z-index:100000;}.ContextMenu .IconContainer{width:32px;height:32px;float:left;display:block;padding-left:10px;padding-right:10px;}.ContextMenu .MenuText{height:20;padding:6px 0px 6px 12px;font-size:16px;}.ContextMenu .MenuSeperator{clear:left;float:left;padding-top:2px;margin:10px 0px 10px 0px;height:0px;width:100%;background-color:#000000;}.ContextMenu .MenuItem{clear:left;float:left;padding-top:2px;width:100%;}.ContextMenu .MenuItemActive{clear:left;float:left;padding-top:2px;width:100%;background-color:#00a6ff;color:white;}.Taskbar{border:1px solid #000000;background-color:#eeeeee;}.Taskbar .unselected{background-color:#EEEEEE;color:black;padding:0px 5px;}.Taskbar .selected{background-color:#00afdb;color:white;padding:0px 5px;}.Programs_Menu_Unselected{background-color:#FFF2E6;border:1px solid #000000;font-family:monospace;font-size:12px;font-weight:bold;}.Programs_Menu_Selected{background-color:#008FAB;border:1px solid #000000;font-family:monospace;color:white;font-size:12px;font-weight:bold;}.TrashTarget, .ComputerTarget, .PlacesTarget{border:1px solid #000000;background-color:#FFF2E6;}')).enable();