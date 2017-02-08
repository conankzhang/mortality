$('#inline-popup').magnificPopup({
  removalDelay: 800,
  callbacks: {
    beforeOpen: function() {
       this.st.mainClass = this.st.el.attr('data-effect');
    }
  },
  closeBtnInside: false,
  focus: 'link-input',
  midClick: true
});

