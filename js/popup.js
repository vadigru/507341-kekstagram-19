'use strict';
(function () {
  var body = document.querySelector('body');
  var picturePreview = document.querySelector('.big-picture');
  var picturePreviewClose = picturePreview.querySelector('.big-picture__cancel');
  var pictureUpload = document.querySelector('#upload-file');
  var pictureEdit = document.querySelector('.img-upload__overlay');
  var pictureEditClose = pictureEdit.querySelector('.img-upload__cancel');
  var zoomOut = pictureEdit.querySelector('.scale__control--smaller');
  var zoomLevel = pictureEdit.querySelector('.scale__control--value');
  var zoomIn = pictureEdit.querySelector('.scale__control--bigger');
  var preset = pictureEdit.querySelector('.effects');
  var submitButton = pictureEdit.querySelector('.img-upload__submit');

  // popup open handlers ------------------------------------------------------
  var bodyModalOpen = function () {
    body.classList.add('modal-open');
  };

  var onThumbnailClick = function (evt) {
    var target = evt.target;
    var pictureId = target.getAttribute('data-id');
    if (pictureId) {
      evt.preventDefault();
      showPicturePreview(window.userPosts[pictureId]);
    }
  };

  var onThumbnailEnterPress = function (evt) {
    window.util.isEnterEvent(evt, onThumbnailClick);
  };

  // popup close handlers -----------------------------------------------------
  var bodyModalClose = function () {
    body.classList.remove('modal-open');
  };

  var popupClose = function () {
    hidePictureEdit();
    hidePicturePreview();
    bodyModalClose();
  };

  var onCrossClickClose = function () {
    popupClose();
  };

  var onPopupEsc = function (evt) {
    window.util.isEscEvent(evt, popupClose);
  };

  // show/hide popup of picture edit ------------------------------------------
  var preventPictureEditClose = function () {
    var pictureHashtag = pictureEdit.querySelector('.text__hashtags');
    var pictureComment = pictureEdit.querySelector('.text__description');
    pictureHashtag.addEventListener('focus', function () {
      document.removeEventListener('keydown', onPopupEsc);
    });
    pictureHashtag.addEventListener('blur', function () {
      document.addEventListener('keydown', onPopupEsc);
    });

    pictureComment.addEventListener('focus', function () {
      document.removeEventListener('keydown', onPopupEsc);
    });
    pictureComment.addEventListener('blur', function () {
      document.addEventListener('keydown', onPopupEsc);
    });
  };

  var hidePictureEdit = function () {
    pictureEdit.classList.add('hidden');
    pictureUpload.value = '';
    zoomIn.removeEventListener('click', window.zoom.onZoomPlusClick);
    zoomOut.removeEventListener('click', window.zoom.onZoomMinusClick);
    preset.removeEventListener('click', window.preset.onPresetClick);
    submitButton.removeEventListener('click', window.validation.onSubmitButtonClick);
    pictureEditClose.removeEventListener('click', onCrossClickClose);
    document.removeEventListener('keydown', onPopupEsc);
  };

  var showPictureEdit = function () {
    pictureEdit.classList.remove('hidden');
    zoomLevel.value = '100%';
    window.preset.hideSlider();
    zoomIn.addEventListener('click', window.zoom.onZoomPlusClick);
    zoomOut.addEventListener('click', window.zoom.onZoomMinusClick);
    preset.addEventListener('click', window.preset.onPresetClick);
    submitButton.addEventListener('click', window.validation.onSubmitButtonClick);
    pictureEditClose.addEventListener('click', onCrossClickClose);
    document.addEventListener('keydown', onPopupEsc);
    bodyModalOpen();
    preventPictureEditClose();
  };

  // add cooments to popup with big photo --------------------------------------
  var renderComments = function (array) {
    var fragment = document.createDocumentFragment();
    var commentsBlock = document.querySelector('.social__comments');
    var commentTemplate = commentsBlock.querySelector('.social__comment');
    commentsBlock.textContent = '';
    array.forEach(function (item) {
      var commentElement = commentTemplate.cloneNode(true);
      var commentAvatar = commentElement.querySelector('.social__picture');
      commentAvatar.src = item.avatar;
      commentAvatar.alt = item.name;
      commentAvatar.width = '35';
      commentAvatar.height = '35';
      commentElement.querySelector('.social__text').textContent = item.message;
      fragment.appendChild(commentElement);
    });
    return fragment;
  };

  // show/hide popup with big photo  ------------------------------------------------
  var hidePicturePreview = function () {
    picturePreview.classList.add('hidden');
    picturePreviewClose.removeEventListener('click', onCrossClickClose);
    document.removeEventListener('keydown', onPopupEsc);
  };

  var showPicturePreview = function (item) {
    picturePreview.classList.remove('hidden');
    picturePreview.querySelector('.social__comment-count').classList.add('hidden');
    picturePreview.querySelector('.comments-loader').classList.add('hidden');
    picturePreview.querySelector('.big-picture__img img').src = item.url;
    picturePreview.querySelector('.likes-count').textContent = item.likes;
    picturePreview.querySelector('.comments-count').textContent = item.comments.length;
    picturePreview.querySelector('.social__caption').textContent = item.description;
    picturePreview.querySelector('.social__comments').appendChild(renderComments(item.comments));
    picturePreviewClose.addEventListener('click', onCrossClickClose);
    document.addEventListener('keydown', onPopupEsc);
    bodyModalOpen();
  };

  // add listeners to pictures preview and upload field -----------------------
  var addListeners = function () {
    var picturesBlock = document.querySelector('.pictures');
    picturesBlock.addEventListener('click', onThumbnailClick);
    picturesBlock.addEventListener('click', onThumbnailEnterPress);
    pictureUpload.addEventListener('change', showPictureEdit);
  };

  addListeners();
})();
