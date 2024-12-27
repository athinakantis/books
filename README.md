# React Book Application

By Athina Kantis  
[Github](https://github.com/athinakantis/)

## Background

This is a school project made for practicing react concepts such as:

-   Custom hooks
-   Routing using react router
-   Using a component library (Material UI)

## Technologies Used

-   React
-   Json server package for mock backend

## Challenges & Solutions

### Image fallback

I struggled a bit trying to fix a faulty image url using material UI components. Until I figured out I was lacking a few properties to the **CardMedia** component.

Firstly I needed to declare that the CardMedia is an image component, then I can use the 'onError' event to change the source of the image as such:

```js
const handleBrokenSrc = (e) => {
    e.target.src = 'http://localhost:3000/book_placeholder.svg';
};
```
