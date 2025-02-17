let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || []; // Recupera os funcionários salvos

// Função para salvar no localStorage
function salvarDados() {
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
}

// Função para cadastrar um novo funcionário
function cadastrar() {
    let id = document.getElementById("id").value.trim();
    let colaborador = document.getElementById("colaborador").value.trim();
    let dataNascimento = document.getElementById("dataNascimento").value.trim();
    let cargo = document.getElementById("cargo").value.trim();

    if (!id || !colaborador || !dataNascimento || !cargo) {
        alert("Preencha todos os campos!");
        return;
    }

    if (funcionarios.some(funcionario => funcionario.ID === id)) {
        alert("Já existe um funcionário com este ID!");
        return;
    }

    funcionarios.push({ ID: id, Nome: colaborador, DataNascimento: dataNascimento, Cargo: cargo });
    salvarDados();
    alert("Funcionário cadastrado com sucesso!");
    limparCampos();
    atualizarLista();
}

// Função para consultar um funcionário pelo ID
function consultar() {
    let id = document.getElementById("id").value.trim();
    let encontrado = funcionarios.find(funcionario => funcionario.ID === id);

    if (encontrado) {
        alert(`ID: ${encontrado.ID}\nColaborador: ${encontrado.Nome}\nData de Nascimento: ${encontrado.DataNascimento}\nCargo: ${encontrado.Cargo}`);
    } else {
        alert("Funcionário não encontrado!");
    }
}

// Função para excluir um funcionário pelo ID
function excluir() {
    let id = document.getElementById("id").value.trim();
    let index = funcionarios.findIndex(funcionario => funcionario.ID === id);

    if (index !== -1) {
        if (confirm("Tem certeza que deseja excluir este funcionário?")) {
            funcionarios.splice(index, 1);
            salvarDados();
            alert("Funcionário excluído com sucesso!");
            limparCampos();
            atualizarLista();
        }
    } else {
        alert("Funcionário não encontrado!");
    }
}

// Função para alterar os dados de um funcionário
function alterar() {
    let id = document.getElementById("id").value.trim();
    let index = funcionarios.findIndex(funcionario => funcionario.ID === id);

    if (index !== -1) {
        let colaborador = document.getElementById("colaborador").value.trim();
        let dataNascimento = document.getElementById("dataNascimento").value.trim();
        let cargo = document.getElementById("cargo").value.trim();

        if (!colaborador || !dataNascimento || !cargo) {
            alert("Preencha todos os campos!");
            return;
        }

        funcionarios[index] = { ID: id, Nome: colaborador, DataNascimento: dataNascimento, Cargo: cargo };
        salvarDados();
        alert("Dados do funcionário alterados com sucesso!");
        limparCampos();
        atualizarLista();
    } else {
        alert("Funcionário não encontrado!");
    }
}

// Atualiza a lista exibida na tela
function atualizarLista() {
    let lista = document.getElementById("listaFuncionarios");
    lista.innerHTML = "";

    funcionarios.sort((a, b) => a.ID - b.ID); // Ordena por ID
    funcionarios.forEach(funcionario => {
        let item = document.createElement("li");
        item.textContent = `ID: ${funcionario.ID} | Nome: ${funcionario.Nome} | Data de Nascimento: ${funcionario.DataNascimento} | Cargo: ${funcionario.Cargo}`;
        lista.appendChild(item);
    });
}

// Exibe a matriz de funcionários no console em formato de tabela
function consultarMatriz() {
    console.table(funcionarios);
}

// Função para limpar os campos do formulário
function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("colaborador").value = "";
    document.getElementById("dataNascimento").value = "";
    document.getElementById("cargo").value = "";
}

// Inicializa a lista ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarLista);
