## Version 1.0 GoldOS is out

*1/1/2009 Now you can officially download GoldOS and play tetris, minesweeper, colorlines, and even checkers. You can also see the development of the Desktop and other applications that still need work like the Tictactoe application and a Notepad application I am working on.

##  GoldOS v1.1 is out!

Now I have updated the branch to add several new features mostly developer information. Here is a summary:

- Added general developer documentation on how to work without JSAN.
- Ran a perl script that got all the documentation into a single folder ./pod/ and you can browse all of it
via the ./html/ folder without having to deal with the Perlish documentation system.
- Updated meta data for consistency and updated ./lib/ folder by adding more documentation and making the system more consistent in terms of conventions. This is still a work in progress.

##  Future Roadmap:

The main focus of our work in general in GoldOS is to improve JavaScript and the availability of JavaScript applications that are easily reusable, maintainable, and understandable for anyone. Recently our main focus has been on the JavaScript core, and implementing it in JavaScript itself.

- JavaScript implementation of the features of versions 1.1 to 1.8 (makes JavaScript work in older browsers)
- JavaScript desugarer to make a very limited subset of JavaScript
- Implementation in Perl.

After an implementation of the core an implementations of graphics libraries for JavaScript developers will be a priority, things like Canvas.* and XBM.* for a XBM backend on older browsers like netscape 4.0, this way you can have rich graphical user interfaces that work in older web browsers. This is all compatible with JSAN and it will be well documented and easy to use.

## JavaScript self-hosting

Our work on JavaScript self-hosting can now be seen at the minijs project. We are glad to say that Array is now self-hosting and Number is well on the way to self-hosting too. Compiling our JavaScript to run on the parrot virtual machine is the ultimate goal. Fortunately the separation of core/view should help us do that. Other news is that a server may be up soon for our JSAN modules.

We are definitely making progress in improving the JavaScript language. I look forward to see what happens in the future.

## GoldOS now solves Sudoko

Now GoldOS can solve Sudoko, just go to sudoko.model.solver. The code there is 250 lines and it solves basic sudoko puzzles. In the way of applications I have never seen anything that has nearly as many as GoldOS. We are certainly making good progress but much still needs to be not only to make sure it runs on Internet Explorer but to add a calculator and other applications too.

I hope that soon other people will come along our code and reuse it because that is the point of the consistent interface that we have designed and the meta files system too. Anyways you might ask what is coming up next? Well we I have a detailed plan for a desktop window with sub windows such as application launchers.

## Window Manager

http://www.flickr.com/photos/33888661@N07/3291694569/

A full Desktop has already been built for GoldOS, however, we are doing over everything from scratch - to make things top of the line in terms of quality. The entire titlebar now uses HTML canvas which means the gradients will be extensible and the buttons offer a richer user interface.

The Desktop will also be such that it is pure canvas and many other applications will be pure canvas. GoldOS will leave open the possibility of application development in either HTML or Canvas though even though Canvas is prefered.

One big problem we face now is still the cross-browser compatibility issue. Opera/Firefox run pretty much the same and Safari seems to have adequate canvas support but IE still is a problem IE canvas only works on IE 6.0 and up. I am thinking for earlier browsers a table might be what is necessary. Minijs will definitely solve all core problems so that much is fortunate the DOM is the major issue.

## GoldOS can play go

I have developed an application that allows the user to play Go. This program is 100% canvas based, it has a rich graphical user interface that works across web browsers with Canvas.Explorer (google's canvas module). This just shows what 25 kb of data and a little programming can do on the Gold operating system!

http://www.flickr.com/photos/33888661@N07/3334728660/

## Greatly Revamped Codebase

Now in GoldOS all rectangles are declared with Grid.Rect. This is used as the basis of all windows and as the basis for
all canvas controls. This adds consitency to the sytem and you don't have to overrun yourself with arguments.
What this also means is you can now finally maximize a window. This means that the system actually looks like a modern desktop. We are starting to surpass Pysch desktop and our other competitiors. I have also posted to MochiKit about how to improve their library so that we can integrate it more fully into our operating system.

The bottom line though is that our goal is to build our applications with the minimium of code possible. Our goal
is not quantity as much as it is quality. After we get quality we will look for quantity.

##  The GoldOS Build System!

We now use YAHOO.util.StyleSheet in order to load all
CSS which means that CSS.Loader is deprecated. CSS.Loader
meant that we had to load all CSS at the same time which
is a serious disadvantage for the user/developer. Thank
god for YAHOO. I don't know what we are going to do considering
that they are messing things up in the next version of their
library so that we probably won't use it anymore.

CSS is combined with all JavaScript files into a single
file that is minified JavaScript that will perform all the operations
necessary for a particular executable application and in addition
we can build .html files that contain the entire executable
so that we can distribute it easily and quickly. (usually less
then 100 kb)

Now we prefer writing out our dependencies as an array as opposed
to several JSAN.use statements.
['MochiKit.Base','YAHOO','Sizzle']

There is no JSAN statements anymore in the executables - the JSAN
code is generated by the compiler from an array like above. This
array is used to add options like server-side compilation. Images
are now in SVG and menus are in XML.

The bottom-line is we are no longer using JavaScript for everything
and this adds countless new options to the user. JavaScript
is not the best tool for doing everything.

##  GoldOS application scalability

http://www.flickr.com/photos/33888661@N07/3377870965/sizes/l/

In GoldOS version 1.45 our major breakthrough is that we do
not configure the pixel size of components in an application
instead we base everything based on the host geometry so that
our application looks good regardless of the size that
is being used by the window manager.

This is something that no other web desktop has really solved
in an effective manner before. Our competitor Pysch Desktop
often disables the ability to resize a window. We will never do
this in GoldOS every single window has the buttons minimize,
maximize, regardless of the applications preferences.

Another breakthrough is we are moving to purely SVG image
storage. SVG is merely converted to PNG because SVG support
is poor and even Firefox will not render it in a Canvas.
The SVG might be useful later though because we may be able to
use it if the browser support is increased or if we are running
applications on the Desktop.

##  GoldOS - User Interface Seperation

In GoldOS we use Canvas extensively, the problem is many web browsers do not support Canvas, as such we have now designed for many applications the option to use an HTML user interface instead. In JavaScript the core of the language - up to 1.8 is implemented in MiniJS and it runs smoothly and consistently regardless of the web browser rendering engine. The major problem we face today is rendering a user interface and communicating with it.

I think we have found a solution in GoldOS. We have all the user interface concerns contained within a view file and we decide which view file to load based on platform support, or we issue a message indicating that you have to upgrade your web browser. In GoldOS we essentially store everything, literally everything in data and then the user interface is merely a representation of that.

One of the means of effective separation is using setters so that when you set something in the data model it can instantaneously be updated to the user interface regardless of what user interface is currently being implemented (Canvas, HTML, etc). For event logic we have a function attachEvents which will be the basis of communication between the view and the controller which is essential because in Canvas you have to user coordinate logic to deduce what you are clicking on and in HTML you have to use the DOM.

What is really interesting though is you can save your current session and then you can reload that session in a different web browser and everything will be exactly the same it will just look a little different.

##  Global Menu Bar System

In GoldOS we have managed to move the menu bars from each window to the top of the screen, and it works efficiently, so you can easily switch between windows. If you want to it will also be relatively easy to change back to a non-global menubar system...

http://www.flickr.com/photos/33888661@N07/3864037118/

I would like to argue that global menubars are the only decent way of doing things on the web browser because they address the following concerns:

Lack of space:
On the web, space is being taken up by the tabs and the titlebar in the web browser as well as a few panels or toolbars, so you have a limited space to display your windows. It is not worth it to put space into creating multiple menubars across the screen. Furthermore, if you place the menus on the top they will have more room to drop down upon the screen.

Efficiency:
It can take up a lot of memory to create ten or twenty DOM elements for every window. If you eventually have twenty windows then it will start to add up.

##  GoldOS Chess Application

The chess application has been in development for quite a while now. Fortunately, it now works correctly:

http://www.flickr.com/photos/33888661@N07/3872944275/sizes/o/

I have tons of more features I want to implement, such as a nice history manager, however, at least it is working relatively well for now. It is drawn purely using canvas, so Internet Explorer users will get a nice "Feature not supported dialog" instead of a working application...

In addition to a history manager, I want to add the option for Internet Explorer support eventually. Currently minesweeper, checkers, and tictactoe work relatively well on Internet Explorer, where as the rest of my applications have some problems...

##  Keyboard Detection In The Web Browser

In the web browser there are several shortcuts available such as CRTL+T to change tabs, and in the desktop environment there is even more such as ALT-F4 which will close the current window. However, if you wanted to make a very advanced application in the web browser, you cannot block keyboard clicks like CRTL+T and ALT+F4 yet, as such JavaScript is very limited in terms of keyboard detection. This is a major disadvantage when designing an entire desktop environment in the web browser, as we are. For example, the Canvas text editor, Bespin does not work in Firefox if you have vimperator enabled, because vimperator uses practically every single keyboard shortcut available to it, which is a good thing, it can seriously increase a users productivity.

There are two solutions that we are using in GoldOS. First of all, if you select a textarea or an input tag, then you will be able to detect at least the keys for an advanced text editor such as Bespin to work, that is keys such as A-Z and 1-9. However, you still won't be able to detect many key clicks that are available to the user such as ALT+F4. As such, our second solution is that you can use an on-screen-keyboard as a means of typing in your text using the mouse. If perhaps, you do not have a keyboard at all, then you could use the on screen keyboard.
http://www.flickr.com/photos/33888661@N07/3880797326/

Notice from this screen-shot the use of both the text input method (on the top) and the on screen keyboard method (on the bottom) as such this is the best way to increase accessibility of the keyboard to more users. We completely abstract away from the builtin DOM models of handling keyboard clicks, so you can send key messages to processes through a variety of means, including the on screen keyboard.

The future:
Now I hope on using at least the arrow keys in each application as a means of navigating the application's elements. Furthermore, I hope on building a terminal using the new keyboard API.

##  Treeviews and Menus

Treeviews are simply views of the tree data structure, a data structure in which consists of children which can have children of there own which can have children of their own and so on. However, menus are the same thing. Menus are views of the tree data structure as well. The difference between menus and treeviews is very small, they are just two ways of views the same thing. As such it makes sense to group them together so that you can make any menu into a treeview:

http://www.flickr.com/photos/33888661@N07/3886846650/sizes/o/

Futhermore, I have extended it to use icons and other features of menus so your user experience is going to be very similar to what you would experience with menus.

http://www.flickr.com/photos/33888661@N07/3887050138/sizes/o/

In the future I hope to extend trees into XML markup storage, although it is still necessary to make trees that are generated by JavaScript functions. I may also make a Canvas alternative menu/treeview system for those individuals who are interested in using a web browser that isn't called Internet Exploder. The user will not get to select the underlying architecture for the view - that is something that should not be configured - it should be determined by the web browser.

##  Internet Explorer Support

HTML User Interfaces:
http://www.flickr.com/photos/33888661@N07/3869653254/sizes/l/

Minesweeper is a good example of an HTML user interface that I have built that works well in Internet Explorer. It does so by abstracting with YAHOO libraries, which create objects that will do all the work to make it so that your HTML manipulations work in Internet Explorer as you would expect them too. Furthermore, I tend to use QEvent right now because it is a lightweight and useful library.

Canvas User Interfaces:
http://www.flickr.com/photos/33888661@N07/3891758298/sizes/l/

My chess application actually works in Internet Explorer because of the VML backend for the Canvas tag, known as EXCanvas. It will get slow though over time, the good thing is that it works.

SVG:
SVG images in Internet Explorer are exported to PNG so that they be viewed, this results in a worse user experience, but at least it works.

##  GOLDOS Version 1.6!

Today I would like to announce the launch of GoldOS version 1.6, this new release has several new features.

http://www.flickr.com/photos/33888661@N07/3894762333/sizes/l/

As you can see from here the programs menu is moved to where users would expect it - to the bottom left corner of the screen. Furthermore, it uses a treeview instead of a menu which has some advantages if you are opening up more then one application at a time.

Furthermore, you can see the Taskbar has been changed. Now the Taskbar will show you your currently selected window that you are dealing with. Also the checkers application is fully featured now, you can play a full game with promotions and all. The chess program is also fully featured, you cannot do any illegal moves except for those that leave your king in check. You can do all the legal moves including promotions and empassant.

http://www.flickr.com/photos/33888661@N07/3894762337/sizes/l/

This screenshot shows the other new features - a Desktop process. This process is still in the works, however, it basically shows how we are going to be looking at things in the future in GoldOS. The Desktop currently uses big icons and you cannot do drag and drop operations yet. That may be added in GoldOS version 1.7.

http://www.flickr.com/photos/33888661@N07/3895568597/sizes/o/

In addition to everything else, the start screen in GoldOS version 1.6 looks nicer for the user.

##  Microsoft Silverlight

I have got my chess application running in Microsoft Silverlight now. This seems like a good solution for those people that have Internet Explorer, because Silverlight's performance is relatively good. It is certainly better then VML.

http://www.flickr.com/photos/33888661@N07/3899829686/sizes/l/

Many Internet Explorer users still do not have Silverlight though, as such basic HTML and VML is still an option for those out of date people who pretty much reject all modern technology and plugins.

I suppose their could also be a Flash and Java port of the Canvas system, although, I do not know how good they would be. It would certainly be an interesting option to consider. I understand though that Raphael is also something interesting to consider because of how it works with both VML and SVG. I still prefer Canvas because of how its performance is the best in Google Chrome and Firefox, so it is good for advanced application development.

As an OS developer I support Canvas as such, its performance is of the sort that is necessary to make the high performance JavaScript applications of the future.

## Eliminate Menubars

Recently there have been many moves to eliminate the menu-bar from the user interface. They are scarce in the Windows 7 UI, they are no longer in Chrome, and there have been some moves to hide it in Firefox 4.0, so now would be a good time to get together and get rid of this outdated user interface tool. Here is some of the reasons for this change:

- Menu-bars in General:
The biggest reason actually for ditching the menu-bar widget in GoldOS is the idea that all menu widgets should come to be from right clicks. Most people associate menus with right-clicks in their head to some extent, so the menu-bars are a sort of anomaly.

In addition to this the menu-bar generally wastes a lot of horizontal space within the row in which the menu-bar is contained, and the user usually looks at other elements within the UI so most of the time the horizontal space which is used is also being wasted. This is even worse in the global menu-bar since the global menu-bar is farther from the application, so the user tends to completely forget about it.

Finally, menu-bars, even global ones, are not really that good for speed in common tasks. Hotkeys and other keyboard commands are generally the quickest way for a user to repeat common tasks, most experienced users will use crtl+c to copy, rather then go to edit/copy.

- Applications/Places/System Menus:
These menus seen in Gnome 2.0 are far inferior to the corner targets seen in the Mezzo Desktop, due to Fitt's Law and the fact that you can right click the corner targets as an alternative way of getting to these menus.

- Local Menu-bars:
These menus take up a lot of space when more then one application is visible at the same time, they are essentially inferior to the global menu-bar because of Fitt's Law, and they do not work very well if the window is moved towards the bottom-right part of the screen.

- Global Menu-bars:
The problem with these menu-bars is they do not work well with multiple monitors, they form a panel that takes away screen space from applications, they are rarely looked at since they are farther away, and they should be close to the window because like things should be grouped together.

- GoldOS
GoldOS originally used the local menu-bar as that is what most people are used to, it was soon realized that global menu-bars utilize Fitt's law, save space and they are much more efficient for a webpage's special needs. However, it is now becoming clear that the global menu-bar is often forgotten about by the user and that it would be better to associate menus with right-clicks, as such soon the menu-bar will soon get their own file, only to be loaded if the user really wants them.

http://www.flickr.com/photos/33888661@N07/4223872763/sizes/l/

Here is the alternative that will be implemented in GoldOS. Menus will come to be when you right click the empty space in the titlebar, or perhaps if you click a hot-key such as alt. There may also be an option to use a Treeview or a desktop-wide menu to access an application's functions.
