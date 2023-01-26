import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router'
import appConfig from '../config.json';


function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.cores.neutras['A']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

function Img(props) {
  if (props.children.length >= 3) {
   return(<Box
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '200px',
        padding: '16px',
        backgroundColor: appConfig.cores.neutras['F'],
        border: '1px solid',
        borderColor: appConfig.cores.neutras['H'],
        borderRadius: '10px',
        flex: 1,
        minHeight: '240px',
      }}
    >
      <Image
        styleSheet={{
          borderRadius: '50%',
          marginBottom: '16px',
        }}
        src={`https://github.com/${props.children}.png`}
      />
      
      <Text
        variant="body2"
        styleSheet={{
          color: appConfig.cores.neutras['B'],
          backgroundColor: appConfig.cores.neutras['G'],
          padding: '10px 15px',
          borderRadius: '1000px'
        }}
      >
        {props.children}
      </Text>
  </Box>)
  } else {
    return ('')
  }

  
}

export default function HomePage() {
  
  const [username,setUsername] = React.useState('')
  const pageChat = useRouter()

  return (
    <>
      {/* Fundo */}
      <Box
        styleSheet={{
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: appConfig.cores.azul.escuro,
          backgroundRepeat: 'no-repeat', 
          backgroundSize: 'cover', 
          backgroundBlendMode: 'multiply',
        }}
      >
        {/* Caixa da aplicação principal */}
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.cores.neutras['E'],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function(e){
              e.preventDefault()
              {/* Direciona para página do ChatBot */}
              pageChat.push("./chat")
            }}
            styleSheet={{
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, 
              textAlign: 'center', 
              marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">{appConfig.titulo}</Titulo>
            <Text variant="body3" 
              styleSheet={{ 
                marginBottom: '32px', 
                color: appConfig.cores.neutras['C'] }}>
              {appConfig.subtitulo} 
            </Text>


            <TextField 
              value={username}
              onChange={function handler(event){
                setUsername(event.target.value)
              }}
              placeholder="Seu usuario do GitHub"
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.cores.neutras['B'],
                  mainColor: appConfig.cores.neutras['G'],
                  mainColorHighlight: appConfig.cores.azul.padrao,
                  backgroundColor: appConfig.cores.neutras['F'],
                },
              }}
            />
            <Button
            
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.cores.neutras['A'],
                mainColor: appConfig.cores.azul.padrao,
                mainColorLight: appConfig.cores.azul.claro,
                mainColorStrong: appConfig.cores.azul.escuro,
              }}
            />
          </Box>

          {/* Imagem*/}
          <Img>{username}</Img>

        
        </Box>
      </Box>
    </>
  );
}