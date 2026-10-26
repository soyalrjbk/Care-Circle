let trash = document.getElementsByClassName("delete");

//Delete
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
      const id = this.parentNode.parentNode.dataset.id
        fetch('providers', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
