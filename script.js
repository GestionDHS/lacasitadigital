let dhs_mensajes = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ".", ",", "!", "?"]
    let elemCasa = document.getElementById("casa");

    let cuadros = [['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'], ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'ti', 't', 't', 't', 't', 'td', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'], ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'ti', 't', 't', 't', 't', 't', 't', 'td', 'c', 'c', 'c', 'c', 'c', 'c', 'c'], ['c', 'c', 'c', 'c', 'c', 'c', 'ti', 't', 't', 'mensaje', 'n', 'n', 'n', 't', 't', 'td', 'c', 'c', 'c', 'c', 'c', 'c'], ['c', 'c', 'c', 'c', 'c', 'ti', 't', 't', 't', 'n', 'n', 'n', 'n', 't', 't', 't', 'td', 'c', 'c', 'c', 'c', 'c'], ['c', 'c', 'c', 'c', 'ti', 't', 't', 't', 't', 'n', 'n', 'n', 'n', 't', 't', 't', 't', 'td', 'c', 'c', 'c', 'c'], ['c', 'c', 'c', 'ti', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 'td', 'c', 'c', 'c'], ['c', 'c', 'ti', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 'td', 'c', 'c'], ['c', 'tiab', 'p', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'p', 'tdab', 'c'], ['c', 'c', 'p', 'bl', 'luz0', 'n', 'bl', 'luz1', 'n', 'bl', 'luz2', 'n', 'bl', 'luz3', 'n', 'bl', 'luz4', 'n', 'bl', 'p', 'c', 'c'], ['c', 'c', 'p', 'bl', 'n', 'n', 'bl', 'n', 'n', 'bl', 'n', 'n', 'bl', 'n', 'n', 'bl', 'n', 'n', 'bl', 'p', 'c', 'c'], ['v', 'v', 'p', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'p', 'v', 'v'], ['v', 'v', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'v', 'v'], ['v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v'], ['v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v']]

    for (let f = 0; f < cuadros.length; f++) {
      let elemFil = document.createElement("TR");
      for (let c = 0; c < cuadros[f].length; c++) {
        let clase = cuadros[f][c];
        if (clase != "n") {
          let elemCell = document.createElement("TD");
          elemCell.classList.add(cuadros[f][c]);
          if (clase.includes("luz")) {
            elemCell.setAttribute("colspan", "2");
            elemCell.setAttribute("rowspan", "2");
          }
          if (clase.includes("mensaje")) {
            elemCell.setAttribute("colspan", "4");
            elemCell.setAttribute("rowspan", "3");
            elemCell.setAttribute("id", "caja-mensajes");
          }
          elemFil.appendChild(elemCell);
        }
      }
      elemCasa.appendChild(elemFil);
    }
    let luces = [];
    let elemSelect = document.createElement("SELECT");
    let elemOption1 = document.createElement("OPTION");
    elemOption1.innerHTML = "1";
    elemOption1.value = "1";
    elemSelect.appendChild(elemOption1);
    let elemOption0 = document.createElement("OPTION");
    elemOption0.innerHTML = "0";
    elemOption0.value = "0";
    elemSelect.appendChild(elemOption0);
    for (let i = 0; i < 5; i++) {
      let esteElem = document.querySelector(".luz" + i);
      let esteSelect = elemSelect.cloneNode(true);
      esteSelect.value = 0;
      esteSelect.addEventListener("change", actualizarMensaje);
      esteElem.appendChild(esteSelect);
      luces.push(esteSelect);
    }

    function actualizarMensaje() {
      document.getElementById("audioBeep").play();
      window.scrollTo(0, 10000);
      var parrafoResultado = document.getElementById("mensaje");
      let mensajeBinario = "";
      for (let luz of luces) {
        let valor = luz.value;
        mensajeBinario += valor;

        if (valor == "1") {
          luz.classList.add("prendida");
          luz.classList.remove("apagada");
        } else {
          luz.classList.remove("prendida");
          luz.classList.add("apagada");
        }
      }
      var numeroOpcion = parseInt(mensajeBinario, 2); //  Binario a decimal
      actualizarTexto(parrafoResultado, dhs_mensajes[numeroOpcion])
    }


    function actualizarTexto(elemento, nuevoTexto) {
      if (elemento.innerText.length > 3) {
        elemento.innerHTML = elemento.innerHTML.slice(0, -1)
        setTimeout(() => {
          actualizarTexto(elemento, nuevoTexto);
        }, 25);
      } else {
        escribirTexto(elemento, nuevoTexto)
      }
    }

    function escribirTexto(elem, nt, veces = 0) {
      if (veces < nt.length) {
        elem.innerHTML += nt[veces];
        setTimeout(() => {
          escribirTexto(elem, nt, veces + 1);
        }, 45);
      }
      else {
        document.getElementById("audioBeep").pause();
      }
    }

    document.getElementById("caja-mensajes").appendChild(document.querySelector(".cuadro-resultado"))


    window.onload = actualizarMensaje();
