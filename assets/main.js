
$(document).ready(function(){

  $('form').on('submit', function(){

      const item = $('form input');
      const product = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/products',
        data: product,
        success: (data) => {
          location.reload();
          
        }
      });

      return false;

  });

  $('.del').on('click', function(){
  
      const product = $(this).val().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/products/' + product,
        success: (data) => {
          location.reload();
        }
      });
  });

  $('.edit').on('click', function(){

    const product = $(this).attr('name').replace(/ /g, "-");
    const id = $(this).val().replace(/ /g, "-");

    //having the value to be edited already in prompt
    const replaceWith = prompt('EDIT MODE: "Please enter-in new information"', product);
    
    //stoping null, undefined and empty values from geting saved to the database
    const edited = replaceWith == null || replaceWith == 'undefined' || replaceWith == "" ? product : replaceWith;

    const data = {
      item: edited
    };
  
      $.ajax({
        type: 'PUT',
        url: '/products/' + id,
        data: data,
        success: (data) => {
          location.reload();
        }
      });
  });

});