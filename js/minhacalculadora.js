//Aqui pega os valores dos botões que está pegando a class .botao
const numeros = document.querySelectorAll('.botao')
// pegando os demais elementos do HTML
const soma = document.getElementById("+")
const subtracao = document.getElementById("-")
const divisao = document.getElementById("/")
const multi = document.getElementById("*")
const igual = document.getElementById("igual")
const limpar = document.getElementById("limpar")
var display = document.getElementById("display")
//para realizar os cálculos
var operador1 = null
var operador2 = null
var operacao = null
var contador = 0
var error = false
//funcao de mostrar erros
function erros(texto) {
	const erro = document.getElementById("erro");
	if (!error) {
		error = true;
		erro.textContent = texto;
		erro.classList.add("fade-in");
		setTimeout(() => {
			erro.classList.add("fade-out");
			setTimeout(() => {
				erro.textContent = "";
				error = false;
				erro.classList.remove("fade-in");
				erro.classList.remove("fade-out");
			}, 1000); // Espera 1 segundos antes de remover a classe fade-out
		}, 3000); // Espera 3 segundos antes de adicionar a classe fade-out
	}
}
//função para calcular expressão
function calcularExpressao(expressao) {
	// Substitui todos os caracteres "x" por "*"
	expressao = expressao.replace(/x/g, "*")
	// Substitui todos os caracteres "÷" por "/"
	expressao = expressao.replace(/÷/g, "/")
	// Usa um try-catch para tratar erros de sintaxe da expressão
	try {
		return Function(`'use strict'; return ${expressao}`)();
	} catch (e) {
		throw new Error("Operação errada!")
	}
}
// Aqui é o evento de todos os botões de 0 a 9 e da ordem de fazer a operação
numeros.forEach(function(numero) {
	numero.addEventListener("click", function() {
		if (display.textContent.length < 15 + contador) {
			if (operacao == null) {
				if (operador1 == null) {
					operador1 = Number(numero.value);
				} else {
					operador1 = operador1 * 10 + Number(numero.value);
				}
			} else {
				if (operador2 == null) {
					operador2 = Number(numero.value);
				} else {
					operador2 = operador2 * 10 + Number(numero.value);
				}
			}
			if (display.textContent === "0" || operador2 === "0") {
				display.textContent = numero.value
			} else {
				display.textContent += numero.value
			}
		}
	})
})
/**colocando evento nos operadores**/
//multiplicação
multi.addEventListener("click", ()=> {
	if (operador1 != null && operador2 != null && operacao != null) {
		if (operador1 != null && operacao == "/" && operador2 == 0) {
			erros("Operação inválida.")
			return
		}
		let resultado = calcularExpressao(`${operador1} ${operacao} ${operador2}`)
		operador1 = resultado
		operador2 = null
		operacao = "*"
		display.textContent = resultado + "x"
	} else if (operador1 != null && operacao == null) {
		operacao = "*"
		display.textContent += "x"
		contador = 16
	}
})
//soma
soma.addEventListener("click",
	function() {
		if (operador1 != null && operador2 != null && operacao != null) {
			if (operador1 != null && operacao == "/" && operador2 == 0) {
				erros("Não pode ser dividido por 0.")
				return
			}
			let resultado = calcularExpressao(`${operador1} ${operacao} ${operador2}`)
			operador1 = resultado
			operador2 = null
			operacao = "+"
			display.textContent = resultado + "+"
		} else if (operador1 != null && operacao == null) {
			operacao = "+"
			display.textContent += "+"
			contador = 16
		}
	})
//subtração
subtracao.addEventListener("click",
	function() {
		if (operador1 != null && operador2 != null && operacao != null) {
			if (operador1 != null && operacao == "/" && operador2 == 0) {
				erros("Não pode ser dividido por 0.")
				return
			}
			let resultado = calcularExpressao(`${operador1} ${operacao} ${operador2}`)
			operador1 = resultado
			operador2 = null
			operacao = "-"
			display.textContent = resultado + "-"
		} else if (operador1 != null && operacao == null) {
			operacao = "-"
			display.textContent += "-"
			contador = 16
		}
	})
//divisão
divisao.addEventListener("click",
	function() {
		if (operador1 != null && operador2 != null && operacao != null) {
			if (operador2 == 0) {
				erros("Não pode ser dividido por 0.")
				return
			}
			let resultado = calcularExpressao(`${operador1} ${operacao} ${operador2}`)
			operador1 = resultado
			operador2 = null
			operacao = "/"
			display.textContent = resultado + "÷"
		} else if (operador1 != null && operacao == null) {
			operacao = "/"
			display.textContent += "÷"
			contador = 16
		}
	})
//evento do botão igual
igual.addEventListener("click",
	function() {
		if (operador1 != null && operacao != null && operador2 == null) {
			erros("Formato usado inválido.")
			return
		}
		if (operador1 != null && operador2 != null && operacao != null) {
			let resultado = calcularExpressao(`${operador1} ${operacao} ${operador2}`)
			if (operador1 != null && operacao == "/" && operador2 == 0) {
				erros("Não pode ser dividido por 0.")
				return
			}
			display.textContent = resultado
			operador1 = resultado
			operador2 = null
			operacao = null
			contador = display.textContent.length
		}
	})
//evento do botão limpar
limpar.addEventListener("click",
	function() {
		display.textContent = ""
		operador1 = null
		operador2 = null
		operacao = null
		contador = 0
	})