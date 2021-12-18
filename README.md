# photo-portfolio

/****************************
*  React Photo Portfolio
*  Author: Dave Feucht
*  Version: 0.9.0
*  Description: Front-end web application for a WordPress backend photography portfolio site. 
****************************/

This is a personal project to learn React, Mobx, CSS grid layout, to get familiar with the 
WordPress REST API, and to get familiar with github. It combines my interest in coding 
and photography, and will serve as a portfolio for both once finished. Hopefully this can 
also eventually be put out into the community for others to use. 

-src/index.html: index page

-src/Index.jsx: sets up react and renders the PhotoPortfolio component

-src/PhotoPortfolio.jsx: sets up the basic structure of the photo portfolio

-src/TitleBar.jsx: sets up the titlebar of the application

-src/Categories.jsx: displays a list of categories with a thumbnail for each category

-src/CategoryThumbnail.jsx: displays a thumbnail image from the featured post of a category

-src/CategoryTitle.jsx: displays the title of a category over the CategoryThumbnail

-src/Category.jsx: displays a category 

-src/CategoryHeader.jsx: displays the category title and subtitle

-src/Posts.jsx: displays a list of posts/photos from a particular cateogory

-src/PostThumbnail.jsx: displays a post as a thumbnail image

-src/Post.jsx: displays a single post/photo in a modal

-src/PostTitlebar.jsx displays the title bar of a Post

-src/PostImage.jsx displays the content of a Post

-src/PostFooter.jsx displays the footer of a post with a list of tags

-src/PostNavigationArrow.jsx displays the navigation arrow to browse Posts in a Category

-src/Footer.jsx: displays the application footer

-sass/main.scss: main sass file which includes the partials

-sass/_building_blocks.scss: global styling elements for things outside of components, such as the <body> tag

Project can be built using the npm (package.json) and webpack (webpack.config.js) config files 
included in the repository. See package.json for external requirements such as babel and node-sass.
