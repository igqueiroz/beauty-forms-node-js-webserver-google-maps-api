$( document ).ready(function() {
	  function mountElements() {
		  $.getJSON( "services/mock.json", function(data) {
			  //console.log(data.fields.button.name)
			  var formElements = '<ul><li><input name="' + data.fields.input1.name + '" id="' + data.fields.input1.id + '" value="' + data.fields.input1.value + '" type="' + data.fields.input1.type + '" class="' + data.fields.input1.class + '" placeholder="Completo" required autocomplete="off" pattern="^[A-Za-z ]+$" />';
			  formElements += '<label for="' + data.fields.input1.name + '">Nome *</label></li>';

			  formElements += '<li><input name="' + data.fields.input2.name + '" id="' + data.fields.input2.id + '" value="' + data.fields.input2.value + '" type="' + data.fields.input2.type + '" class="' + data.fields.input2.input + '" pattern="([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})" required placeholder="' + data.fields.input2.Mask + '" autocomplete="off" />';
			  formElements += '<label class="label" for="' + data.fields.input2.name + '">CPF *</label></li>'; 
			 
			  formElements += '<li><input name="' + data.fields.input3.name + '" id="' + data.fields.input3.id + '" value="' + data.fields.input3.value + '" pattern="([\(]?[0-9]{2}?[\)]\\s?[0-9]{5}[-]?[0-9]{4})" type="' + data.fields.input3.type + '" class="input" placeholder="' + data.fields.input3.Mask + '" required autocomplete="off" />'; 	
			  formElements += '<label class="label" for="' + data.fields.input3.name + '">Telefone *</label></li>'; 

			  formElements += '<li><input name="' + data.fields.input4.name + '" id="' + data.fields.input4.id + '" value="' + data.fields.input4.value + '" type="' + data.fields.input4.type + '" class="' + data.fields.input4.class + '" placeholder="Completo" required autocomplete="off" />';

			  formElements += '<label class="label" for="' + data.fields.input4.name + '" onFocus="geolocate()">Endereço *</label>'; 
			  									
			  formElements += '<li class="twice"><input name="txtAdressNumber" id="txtAdressNumber" value="" type="text" class="input" required placeholder="000" autocomplete="off" />';		
			  formElements += '<label class="label" for="txtNumber">Número *</label></li>';
				
			  formElements += '<li class="twice"><input name="txtComplement" id="txtComplement" value="" type="text" class="input"   placeholder="Apartamento - Bloco" autocomplete="off" />';
			  formElements += '<label class="label" for="txtComplement">Complemento</label></li>'; 

			  formElements += '<li><div class="btn-file"><span class="hidden-xs">Selecionar arquivo…</span><input type="file" id="' + data.fields.upload.id + '" class="' + data.fields.upload.class + '" name="' + data.fields.upload.name + '[]" value="" required /></div>';	
		
			  formElements += '<output id="list"></output>';
			  formElements += '<button name="' + data.fields.button.name + '" id="' + data.fields.button.id + '" value="' + data.fields.button.value + '" class="' + data.fields.button.class + '" type="submit" >Enviar</button></<ul>';
			  $('#form-contato').append(formElements);
			  $('#uplImage').on( "change", handleFileSelect);
	  		  $('#txtCpf').mask('000.000.000-00');
			  $('#txtTelefone').mask('(00) 00000-0000');
			  $('#txtAddress').keydown(function(event){ if(event.keyCode == 13) { event.preventDefault(); return false; }});
			  initAutocomplete();
			  $('#btnSave2').click(function(event) {save_data() });

		  	})
	  }
	  
	  save_img = "";
	  function handleFileSelect(evt) {
	  	var files = evt.target.files; // FileList object

	    // Loop through the FileList and render image files as thumbnails.
	  	for (var i = 0, f; f = files[i]; i++) {

	      // Only process image files.
	      if (!f.type.match('image.*')) {
	      	alert('Selecione somente imagens para fazer Upload');
	      }
	      else {
	      	  var reader = new FileReader();
		      // Closure to capture the file information.
		      reader.onload = (function(theFile) {
		        return function(e) {
		          // Render thumbnail.
		          var span = document.createElement('span');
		          span.innerHTML = ['<img id="imgAvatar" class="image" src="', e.target.result,
		                            '" title="', escape(theFile.name), '"/>'].join('');
		          $('#list').empty();
		          document.getElementById('list').insertBefore(span, null);
		          save_img = e.target.result
		        };
		      })(f);

		      // Read in the image file as a data URL.
		      reader.readAsDataURL(f);
		    }
	    }
	  }
    mountElements();
  	
  	var placeSearch, autocomplete;
  	function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('txtAddress')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        
      }

      

      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }

      var pessoalAtual = 0;
      $('#form-contato').submit(function(e) {
      	$('#form-contato button').addClass('progress');
      	e.preventDefault();  	
      	pessoalAtual++;
      	var txtFullname = $('#txtFullname').val();
      	var txtCPF = $('#txtCpf').val();
      	var txtTelephone = $('#txtTelefone').val();
      	var txtAddress = $('#txtAddress').val();
      	var txtAdressNumber = $('#txtAdressNumber').val();
      	var txtComplement = $('#txtComplement').val();
      	imgFile = save_img;
      	var saved_data1 = {"txtFullname": txtFullname, "txtCPF": txtCPF, "txtTelephone": txtTelephone, "txtAddress": txtAddress, "txtAdressNumber": txtAdressNumber, "txtComplement": txtComplement, "uplImage": imgFile };
      	localStorage.setItem("pessoa"+pessoalAtual, JSON.stringify(saved_data1));
      	//console.log(localStorage.getItem("saved_data1"));

      	//para mostrar o botão em momento de sending data >
      	setTimeout(function(){
      		alert('Formulário foi enviado com sucesso! Digite localStorage no Console para ver os dados salvos.');
      		document.getElementById("form-contato").reset();
      		$('#list').empty();
      		$('#form-contato button').removeClass('progress');
      	}, 1500); 
      	
      })
});	