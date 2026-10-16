// Importa o React para construção do componente
import React from 'react';
// Importa o container de navegação para gerenciar o histórico de telas
import { NavigationContainer } from '@react-navigation/native';
// Importa o navegador em pilha (Stack Navigator)
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas localizadas dentro da pasta screens (corrigido para a sua estrutura)
import CatalogScreen from './screens/CatalogScreen';
import FormScreen from './screens/FormScreen';

// Inicializa o componente de pilha
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // NavigationContainer envolve todo o app para prover a navegação
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Catalog" // Define qual tela abre primeiro (Tela de Catálogo)
        screenOptions={{
          headerStyle: { backgroundColor: '#000000' }, // Fundo do cabeçalho em preto
          headerTintColor: '#FFFFFF', // Texto e setas em branco
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Tela 1: Listagem, Consulta e Exclusão (Read / Delete) */}
        <Stack.Screen 
          name="Catalog" 
          component={CatalogScreen} 
          options={{ title: '🎬 Catálogo de Filmes' }} 
        />
        
        {/* Tela 2: Cadastro e Edição de Registros (Create / Update) */}
        <Stack.Screen 
          name="Form" 
          component={FormScreen} 
          options={{ title: 'Gerenciar Filme' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}