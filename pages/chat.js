import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';



export default function ChatPage() {    
    
    // variaveis 
    const [mensagem, setMensagem] = React.useState('')
    const [listaMensagens, setListaMensagens] = React.useState([])
    const LINK_SERVIDOR = appConfig.servidor
    const NOMEUSR = localStorage.getItem("usuario")
    
   

    function novaMensagem(mensagemUsr, mensagemBot){
        // Objeto mensagem usuario 
        const dataMensage = {
            id: `guilherme:${listaMensagens.length+1}`,
            from: NOMEUSR,
            text: mensagemUsr,
            img: `https://github.com/${NOMEUSR}.png`,
            date: dataHoraAtual(),
            position: 'end',
            color: 'D'
        }
        // Objeto mensagem bot 
        const botMensage = {
            id: `bot:${listaMensagens.length+1}`,
            from: 'bot',
            text: mensagemBot,
            img: "/img/icon-robot.jpg",
            date: dataHoraAtual(),
            position: 'start',
            color: 'I'
        }
           
        // Reescreve a lista no formato chat 
        setListaMensagens([
            botMensage,
            dataMensage,
            ...listaMensagens
        ])
        // limpa caixa de mensagem do usuário
        setMensagem('');        
    }

    function requisicaoServidor() {
    
        let envio = new FormData;
        envio.append('usuario', mensagem)
        fetch(LINK_SERVIDOR, {
        method: 'POST',
        body: envio
        })
        .then((response)=>response.json())
        .then((json)=> {
    
            novaMensagem(mensagem, json.texto);
            
        })
    }
    
    {/* Estrutura da página */}
    return (
        /* Fundo */
        <Box
            styleSheet={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: appConfig.cores.azul.escuro,
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover', 
                color: appConfig.cores.neutras['A']
            }}
        >
            {/* Caixa central da aplicação */}
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.cores.neutras['E'],
                    height: '100%',
                    maxWidth: '60%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                {/* Cabeçalho */}
                <Header />
                {/* Display dos diálogos */}
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.cores.neutras['D'],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* Todas as mensagens na tela */}
                    <ImprimirMensagens mensagens={listaMensagens}/>
                    
                    {/* Entrada do usuário */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {/* Campo de texto */}
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                setMensagem(event.target.value)
                            }}
                            onKeyPress={function(e){

                                if (e.key == 'Enter'){
                                    e.preventDefault();
                                    
                                    requisicaoServidor();
                                }
                                
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.cores.neutras['F'],
                                marginRight: '12px',
                                color: appConfig.cores.neutras['B'],
                            }}
                        
                        />
                        {/* Botão de envio da mensagem */}
                        <Button
                        colorVariant="light"
                        iconName="arrowRight"
                        label=""
                        variant="secondary"
                        onClick={function(e) {
                            
                            requisicaoServidor();
                        }}
                        />
            </Box>
                    </Box>
                </Box>
            </Box>
        
    )
}

{/* Cabelhaço da aplicação */}
function Header() {
    return (
        <>
            <Box styleSheet={{ 
                    width: '100%', 
                    marginBottom: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' }} >
                <Text variant='heading4'>
                    {appConfig.subtitulo}
                </Text>
                
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

{/* Lista as mensagens */}
function ImprimirMensagens(props) {
  
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.cores.neutras['A'],
                marginBottom: '16px',
                paddingRight: '15px'
            }}
        >

            {props.mensagens.map((msg)=>{
                return (
                    <Text
                    key={msg.id}
                    tag="li"
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: `flex-${msg.position}`,
                        borderRadius: '5px',
                        padding: '6px',
                        marginBottom: '12px',
                        fontSize: '16px',
                        backgroundColor: appConfig.cores.neutras[msg.color],
                        hover: {
                            backgroundColor: appConfig.cores.neutras['E'],
                        }
                    }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={msg.img}
                            />
                            <Text tag="strong" 
                                styleSheet={{
                                    fontSize: '18px',
                                    hover:{
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                {msg.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '14px',
                                    marginLeft: '8px',
                                    color: appConfig.cores.neutras['C'],
                                }}
                                tag="span"
                            >
                                {msg.date}
                            </Text>
                        </Box>
                        {msg.text}
                    </Text>
                );
            })}
        </Box>
    )
}

function dataHoraAtual(){

    let data = new Date();

    let dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear(),
        horario =  data.getHours()+ ":" + data.getMinutes() + ":" + data.getSeconds();


    return `${dia}/${mes}/${ano} - ${horario}`;
}

function nomeUsuario() {
    // url e sub-diretorio
    const url = document.URL, 
            subDir = '/chat/'
    // tratamento para identificar o usuario
    let posDir = url.indexOf(subDir)
    let nomeUsr = url.slice(posDir + subDir.length)
    
    return nomeUsr;
}
