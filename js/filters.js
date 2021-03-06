'use strict';
(function () {
  var RANDOM_POSTS_AMOUNT = 10;
  var userPosts;

  // update displayed user post thumbnails with sorted array ------------------
  var updatePosts = function (arr) {
    var postBlock = document.querySelector('.pictures');
    var postThumbs = document.querySelectorAll('.picture');
    postThumbs.forEach(function (item) {
      postBlock.removeChild(item);
    });
    window.gallery.showPosts(arr);
  };

  // filter array -------------------------------------------------------------
  var defaultPosts = function () {
    updatePosts(userPosts);
  };

  var randomPosts = function () {
    var randomArr = window.util.shuffleArray(userPosts.slice()).slice(0, RANDOM_POSTS_AMOUNT);
    updatePosts(randomArr);
  };

  var discussedPosts = function () {
    var discussedArr = userPosts.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    updatePosts(discussedArr);
  };

  // selects which filter should run ------------------------------------------
  var selectFilter = function (target) {
    switch (target.id) {
      case 'filter-random':
        randomPosts();
        break;
      case 'filter-discussed':
        discussedPosts();
        break;
      default:
        defaultPosts();
    }
  };

  // set active status to menu item and trigger filtering ---------------------
  var onFilterButtonClick = window.util.debounce(function (evt) {
    var target = evt.target;
    if (!target.classList.contains('img-filters__button')) {
      return;
    }
    var filterButtonActive = document.querySelector('.img-filters__button--active');
    filterButtonActive.classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');
    selectFilter(target);
  });

  // activate filter menu -----------------------------------------------------
  var showFilterMenu = function (arr) {
    userPosts = arr;
    var filterBlock = document.querySelector('.img-filters');
    var filterList = filterBlock.querySelector('.img-filters__form');
    filterBlock.classList.remove('img-filters--inactive');
    filterList.addEventListener('click', onFilterButtonClick);
  };

  window.filters = {
    showMenu: showFilterMenu
  };
})();
