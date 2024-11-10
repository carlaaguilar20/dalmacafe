var carritoVisible = false;
if (document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
    
}else{
    ready();
}
function ready(){
    var botonesEliminarItem= document.getElementsByClassName('botonEliminar');
    for(var i=0; i<botonesEliminarItem.length;i++){
        var button= botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }
    botonesSumarcantidad= document.getElementsByClassName('sumarCantidad');
    for (var  i=0; i< botonesSumarcantidad.length ; i++){
        var button= botonesSumarcantidad[i];
        button.addEventListener('click' , sumarCantidad)
    }
    botonesRestarcantidad= document.getElementsByClassName('restarCantidad');
    for (var  i=0; i< botonesRestarcantidad.length ; i++){
        var button= botonesRestarcantidad[i];
        button.addEventListener('click' , restarCantidad)
    }
    var botonesAgregarAlCarrito= document.getElementsByClassName('botonProducto');
    for (var i=0; i<botonesAgregarAlCarrito.length; i++){
        var button= botonesAgregarAlCarrito[i];
        button.addEventListener('click' , agregarAlCarritoClicked);
    }
    document.getElementsByClassName('botonPagar')[0].addEventListener('click', pagarClicked );
}

function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

function  actualizarTotalCarrito(){
    var carritoContenedor= document.getElementsByClassName('carritoCompras')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carritoItem');
    var total = 0;
    for ( var i=0; i<carritoItems.length; i++){
        var item = carritoItems[i];
        var precioElemento= item.getElementsByClassName('carritoPrecio')[0];
        console.log(precioElemento);
        var precio = parseFloat(precioElemento.innerText.replace('$' , '').replace('.' , ''));
        console.log(precio);
        var cantidadItem= item.getElementsByClassName('carritoCantidad')[0];
        var cantidad= cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }
    total= Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText= '$' +total.toLocaleString("es") + ',00';
}

function ocultarCarrito(){
    var carritoItems= document.getElementsByClassName('carritoItems')[0];
    if (carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carritoCompras')[0];
        carrito.style.marginRight= '0';
        carrito.style.opacity='1';
        carritoVisible=false;
        var items = document.getElementsByClassName('productosCarrito')[0];
        items.style.width='100%';
    }
}

function sumarCantidad(event){
    var buttonClicked= event.target;
    var selector= buttonClicked.parentElement;
    var cantidadActual=selector.getElementsByClassName('carritoCantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carritoCantidad')[0].value= cantidadActual;
    Swal.fire({
        position: 'bottom',
        icon: "success",
        title: "Se agrego  ",
        showConfirmButton: false,
        timer: 1500
      });
      actualizarTotalCarrito();
}

function restarCantidad(event){
    console.log(restarCantidad)
    var buttonClicked= event.target;
    var selector= buttonClicked.parentElement;
    var cantidadActual=selector.getElementsByClassName('carritoCantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carritoCantidad')[0].value= cantidadActual;
        selector.getElementsByClassName('carritoCantidad')[0].value= cantidadActual;
    Swal.fire({
        position: 'bottom',
        icon: "success",
        title: "Se elimino  ",
        showConfirmButton: false,
        timer: 1500
      });
      actualizarTotalCarrito();
    }
    
}

function agregarAlCarritoClicked(event){
    var button= event.target;
    var item= button.parentElement;
    var titulo= item.getElementsByClassName('tituloProducto')[0].innerText;
    console.log(titulo);
    var precio= item.getElementsByClassName('precioProducto')[0].innerText;
    var imagenSrc= item.getElementsByClassName('imagenCarrito')[0].src;
    console.log(imagenSrc)
    Swal.fire({
        position: 'bottom',
        icon: "success",
        title: "Se agrego al carrito  ",
        showConfirmButton: false,
        timer: 1500
      });
      agregarItemAlCarrito(titulo,precio,imagenSrc);
      hacerVisibleCarrito();
    }

    function agregarItemAlCarrito(titulo,precio,imagenSrc){
        var item= document.createElement('div');
        item.classList.add= 'item';
        var itemsCarrito= document.getElementsByClassName('carritoItems')[0];
        var nombresItemsCarrito= itemsCarrito.getElementsByClassName('carritoTitulo');
        for (var i= 0; i< nombresItemsCarrito.length;i++){
            if(nombresItemsCarrito[i].innerText==titulo){
                Swal.fire({
                    position: 'bottom',
                    icon: "success",
                    title: "el producto se encuentra en el carrito ",
                    showConfirmButton: false,
                    timer: 1500
                  });
                return;
            }
           
        }
        var itemCarritoContenido= `
        <div class="carritoItem">
                    <img  src="${imagenSrc}" alt="bolsacafe1" width="80px">
                    <div class="carritoDetalles">
                        <span class="carritoTitulo">${titulo} </span>
                        <div class="selectorCantidad">
                            <i class="fa-solid fa-minus restarCantidad"></i>
                            <input type="text" value="1" class="carritoCantidad" disabled>
                            <i class="fa-solid fa-plus sumarCantidad"></i>
                        </div>
                        <span class="carritoPrecio">${precio}</span>
                    </div>
                    <span class="botonEliminar"><i class="fa-solid fa-trash"></i> </span>
                </div>
        `
        item.innerHTML= itemCarritoContenido;
        itemsCarrito.append(item);
        item.getElementsByClassName('botonEliminar')[0].addEventListener('click',eliminarItemCarrito);
        var botonesSumarcantidad= item.getElementsByClassName('sumarCantidad')[0];
        botonesSumarcantidad.addEventListener('click', sumarCantidad);
        var botonesRestarcantidad= item.getElementsByClassName('restarCantidad')[0];
        botonesRestarcantidad.addEventListener('click', restarCantidad);
    }

    function pagarClicked(event){

         Swal.fire({
            position: 'bottom',
            icon: "success",
            title: "Gracias por su compra",
            showConfirmButton: false,
            timer: 1500
          });
          var carritoItems= document.getElementsByClassName('carritoItems')[0];
          while(carritoItems.hasChildNodes()){
            carritoItems.removeChild(carritoItems.firstChild);
          }
          actualizarTotalCarrito();
          ocultarCarrito();
    }

    function hacerVisibleCarrito(){
        carritoVisible=true;
        var carrito= document.getElementsByClassName('carritoCompras')[0];
        carrito.style.marginRight='0';
        carrito.style.opacity='1';
        var items = document.getElementsByClassName('carritoItems')[0];
        items.style.width='60%';
    }