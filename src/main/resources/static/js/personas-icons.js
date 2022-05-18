$(document).ready(function() {
	$.getJSON('/personaList', function(json) {
		var tr=[];
		let botonEditar = '<a href="#" class=\'edit\'><img src="https://img.icons8.com/arcade/64/000000/experimental-edit-arcade.png"/></a>';
		for (var i = 0; i < json.length; i++) {
			let botonEliminar = '<a href="#" class=\'delete\' id=' + json[i].id + '><img src="https://img.icons8.com/color/48/000000/delete-forever.png"/></a>';
			tr.push('<tr>');
			tr.push('<td>' + json[i].id + '</td>');
			tr.push('<td>' + json[i].nombre + '</td>');
			tr.push('<td>' + json[i].apellido + '</td>');
			tr.push('<td>' + json[i].email + '</td>');
			tr.push('<td>' + json[i].telefono + '</td>');
			tr.push('<td>'+ botonEditar +'&nbsp;&nbsp;'+botonEliminar+'</td>');
			tr.push('</tr>');
		}
		$('table').append($(tr.join('')));
	});
	
	$(document).delegate('#addNew', 'click', function(event) {
		event.preventDefault();

		var nombre = $('#nombre').val();
		var apellido = $('#apellido').val();
		var email = $('#email').val();
		var telefono = $('#telefono').val();
		
		if(nombre=='' && apellido == ''){
			alert('Debe ingresar un nombre o un apellido');
			return;
		}
		if(telefono=='' && email == ''){
			alert('Debe ingresar un telefono o un email');
			return;
		}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "/persona/save",
			data: JSON.stringify({'nombre': nombre, 'apellido': apellido, 'email': email, 'telefono': telefono }),
			cache: false,
			success: function(result) {
				$("#msg").html( "<span style='color: green'>Persona agregada con exito</span>" );
				window.setTimeout(function(){location.reload()},1000)
			},
			error: function(err) {
				$("#msg").html( "<span style='color: red'>Error al guardar persona</span>" );
			}
		});
	});
	
	$(document).delegate('.delete', 'click', function() { 
		if (confirm('¿Esta seguro que quiere eliminar la persona?')) {
			var id = $(this).attr('id');
			var parent = $(this).parent().parent();
			$.ajax({
				type: "DELETE",
				url: "/persona/delete/" + id,
				cache: false,
				success: function() {
					parent.fadeOut('slow', function() {
						$(this).remove();
					});
					location.reload(true)
				},
				error: function() {
					$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error borrando persona').fadeIn().fadeOut(4000, function() {
						$(this).remove();
					});
				}
			});
		}
	});
	
	$(document).delegate('.edit', 'click', function() {
		var parent = $(this).parent().parent();
		
		var id = parent.children("td:nth-child(1)");
		var nombre = parent.children("td:nth-child(2)");
		var apellido = parent.children("td:nth-child(3)");
		var email = parent.children("td:nth-child(4)");
		var telefono = parent.children("td:nth-child(5)");
		var buttons = parent.children("td:nth-child(6)");
		
		let botonGuardar = '<a href="#" id=\'save\'><img src="https://img.icons8.com/cute-clipart/64/000000/save.png"/></a>';
		let botonEliminar = '<a href="#" class=\'delete\' id=' + id.html() + '><img src="https://img.icons8.com/color/48/000000/delete-forever.png"/></a>';
		
		nombre.html("<input type='text' id='txtName' value='" + nombre.html() + "'/>");
		apellido.html("<input type='text' id='txtApellido' value='" + apellido.html() + "'/>");
		email.html("<input type='text' id='txtEmail' value='" + email.html() + "'/>");
		telefono.html("<input type='text' id='txtTelefono' value='" + telefono.html() + "'/>");
		buttons.html(botonGuardar+"&nbsp;&nbsp;"+ botonEliminar);
	});
	
	$(document).delegate('#save', 'click', function() {
		var parent = $(this).parent().parent();
		
		var id = parent.children("td:nth-child(1)");
		var nombre = parent.children("td:nth-child(2)");
		var apellido = parent.children("td:nth-child(3)");
		var email = parent.children("td:nth-child(4)");
		var telefono = parent.children("td:nth-child(5)");
		var buttons = parent.children("td:nth-child(6)");

		if(nombre.children("input[type=text]").val()=='' && apellido.children("input[type=text]").val() == ''){
			alert('Debe ingresar un nombre o un apellido');
			return;
		}
		if(email.children("input[type=text]").val()=='' && telefono.children("input[type=text]").val() == ''){
			alert('Debe ingresar un telefono o un email');
			return;
		}

		$.ajax({
			type: "PUT",
			contentType: "application/json; charset=utf-8",
			url: "/persona/update",
			data: JSON.stringify({'id' : id.html(), 'nombre' : nombre.children("input[type=text]").val(), 'apellido' : apellido.children("input[type=text]").val(), 'email' : email.children("input[type=text]").val(), 'telefono' : telefono.children("input[type=text]").val()}),
			cache: false,
			success: function() {
				nombre.html(nombre.children("input[type=text]").val());
				apellido.html(apellido.children("input[type=text]").val());
				email.html(email.children("input[type=text]").val());
				telefono.html(telefono.children("input[type=text]").val());
				buttons.html('<a href="#" class=\'edit\' id=' + id.html() + '><img src="https://img.icons8.com/arcade/64/000000/experimental-edit-arcade.png"/></a>&nbsp;&nbsp;<a href="#" class=\'delete\' id=' + id.html() + '><img src="https://img.icons8.com/color/48/000000/delete-forever.png"/></a>');
			},
			error: function() {
				$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error updating record').fadeIn().fadeOut(4000, function() {
					$(this).remove();
				});
			}
		});
	});

});
