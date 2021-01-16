document.getElementById('formulario').addEventListener('submit', cadastraVeiculo);

function cadastraVeiculo(e){
    let modeloCarro = document.getElementById('modeloCarro').value;
    let placaCarro = document.getElementById('placaCarro').value;
    let time = new Date();

    if(!modeloCarro && !placaCarro){ // TRATAMENTO DE ERRO
        alert("Por favor, preencha os campos em branco!");
        return false;
    }else{
        carro = { // OBJETO
            modelo: modeloCarro,
            placa: placaCarro,
            dia: time.getDate(),
            mes: time.getMonth(),
            hora: time.getHours(),
            minutos: time.getMinutes()
        }


        if(localStorage.getItem('patio2') === null) {
            let carros = [];
            carros.push(carro);
            localStorage.setItem('patio2', JSON.stringify(carros));
        }else{
            let carros = JSON.parse(localStorage.getItem('patio2'));
            carros.push(carro);
            localStorage.setItem('patio2', JSON.stringify(carros));
        }

        document.getElementById('formulario').reset();

        mostraPatio();
        
        e.preventDefault();
    }
}

function apagarVeiculo(placa){
    let carros = JSON.parse(localStorage.getItem('patio2'));

    for(var i=0; i < carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i, 1);
        }

        localStorage.setItem('patio2', JSON.stringify(carros));
    }
    mostraPatio();
}

function mostraPatio(){
    let carros = JSON.parse(localStorage.getItem('patio2'));
    var carrosResultado = document.getElementById('resultados');

    carrosResultado.innerHTML='';

    for(let i=0; i<carros.length; i++){
        let modelo = carros[i].modelo;
        let placa = carros[i].placa;
        let dia = carros[i].dia;
        let mes = carros[i].mes;
        let hora = carros[i].hora;
        let minutos = carros[i].minutos;

        carrosResultado.innerHTML += `<tr><td> ${modelo} </td>
                                <td> ${placa} </td>
                                <td> ${dia} / ${mes} </td>
                                <td> ${hora}:${minutos} </td>
                                <td><button class="btn btn-danger" onclick="apagarVeiculo('${placa}')">Excluir</button></td>
                                </tr>`;
        console.log(dia, mes)

    
    }

}