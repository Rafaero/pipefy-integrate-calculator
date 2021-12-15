async function enviar() {
    let id = document.getElementById("idField").value;
    let questionOne = "";
    let questionTwo = "";
    let questionThree = "";
    let questionFour = "";
    let questionFive = "";
    let questionSix = "";
    let questionSeven = "";
    let questionEight = "";
    let questionNine = "";
    let questionTen = "";
    let questionEleven = "";


    let data = [];

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDEzMjIzNzEsImVtYWlsIjoibHV6LmlyaWFydGVAa2V5cnVzLmNvbSIsImFwcGxpY2F0aW9uIjozMDAxMjYwMDl9fQ.vdpen9-ki7OI5k8uTwgnged5Quq8R1woBLjii6Bd0cVVV7lwFg4ZBw2_3kH_7u2zR7bXZ95a_omGsQA9AYR8BQ',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `query{
            card(id: "${id}"){
                 fields{
                name
                value
                }
              }
            }`})
    };

    await fetch('https://api.pipefy.com/graphql', options)
        .then(response => (response.json()))
        .then(response => data = (response.data.card.fields))
        .catch(err => console.error(err));


    data.map((value) => {
        if (value.name == "2.2 Qual a ferramenta em que o relatório foi desenvolvido?") {
            questionOne = parseFloat(value.value.replace(',', '.'));
        }
    })
    data.map((value) => {
        if (value.name == "2.3 Esta cadastrado no Portal IN?") {
            questionTwo = parseFloat(value.value.replace(',', '.'));
        }
    })
    data.map((value) => {
        if (value.name == "2.4 Possui Glossário?") {
            questionThree = parseFloat(value.value.replace(',', '.'));
        }
    })
    data.map((value) => {
        if (value.name == "2.5 Aprovado por Governança Dataviz?") {
            questionFour = parseFloat(value.value.replace(',', '.'));
        }
    })
    data.map((value) => {
        if (value.name == "2.6 Ferramenta utilizada na preparação de dados") {
            questionFive = parseFloat(value.value.replace(',', '.'));
        }
    })
    data.map((value) => {
        if (value.name == "2.7 Qual o tipo de processo de carga? ORIGEM") {
            questionSix = parseFloat(value.value.replace(',', '.'));
        }
    })
    data.map((value) => {
        if (value.name == "2.8 Utiliza SFTP ou Carga Fria?") {
            questionSeven = parseFloat(value.value.replace(',', '.'));
        }
    })
    data.map((value) => {
        if (value.name == "2.9 Relatório está Automatizado/Agendado?") {
            questionEight = parseFloat(value.value.replace(',', '.'));
        }
    })
    data.map((value) => {
        if (value.name == "2.10 Utiliza DBLINK?") {
            questionNine = parseFloat(value.value.replace(',', '.'));
        }
    })
    data.map((value) => {
        if (value.name == "2.11 O Processo está automatizado?") {
            questionTen = parseFloat(value.value.replace(',', '.'));
        }
    })
    data.map((value) => {
        if (value.name == "2.12 - O Relatório contém dados pessoais?") {
            questionEleven = parseFloat(value.value.replace(',', '.'));
        }
    })

    let percent = (((questionOne + questionTwo + questionThree + questionFour + questionFive + questionSix + questionSeven + questionEight + questionNine + questionTen + questionEleven) / 37 * 100)).toFixed(0) + "%";
    let result = parseFloat((questionOne + questionTwo + questionThree + questionFour + questionFive + questionSix + questionSeven + questionEight + questionNine + questionTen + questionEleven)).toFixed(2)

    if (result >= 0 || result <= 0) {
        document.getElementById("show-sum").innerHTML = result;

        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDEzMjIzNzEsImVtYWlsIjoibHV6LmlyaWFydGVAa2V5cnVzLmNvbSIsImFwcGxpY2F0aW9uIjozMDAxMjYwMDl9fQ.vdpen9-ki7OI5k8uTwgnged5Quq8R1woBLjii6Bd0cVVV7lwFg4ZBw2_3kH_7u2zR7bXZ95a_omGsQA9AYR8BQ',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: `mutation{
                updateCardField(input: {
                    card_id: "${id}"
                    field_id: "2_1_nota_final"
                    new_value: "${result}"
                }){clientMutationId}}`})

        };
    
        fetch('https://api.pipefy.com/graphql', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));


    } else {
        alert("Preencha todos os campos");
    }

    if (result >= 0 || result <= 0) {
        document.getElementById("show-percent").innerHTML = percent;

        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDEzMjIzNzEsImVtYWlsIjoibHV6LmlyaWFydGVAa2V5cnVzLmNvbSIsImFwcGxpY2F0aW9uIjozMDAxMjYwMDl9fQ.vdpen9-ki7OI5k8uTwgnged5Quq8R1woBLjii6Bd0cVVV7lwFg4ZBw2_3kH_7u2zR7bXZ95a_omGsQA9AYR8BQ',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: `mutation{
                updateCardField(input: {
                    card_id: "${id}"
                    field_id: "porcetagem"
                    new_value: "${percent}"
                }){clientMutationId}}`})

        };
    
        fetch('https://api.pipefy.com/graphql', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));


    }
}
