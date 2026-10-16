import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CatalogScreen({ navigation }) {
  // Estado inicial com um filme de exemplo
  const [filmes, setFilmes] = useState([
    {
      id: '1',
      nome: 'Interestelar',
      genero: 'Ficção Científica',
      sinopse: 'Viagem através de um buraco de minhoca em busca de um novo lar.',
      ano: '2014'
    }
  ]);

  // Função para adicionar ou editar filmes recebidos da tela de formulário
  const handleAtualizarLista = (filmeRecebido, editando) => {
    if (editando) {
      setFilmes(filmesAnteriores => 
        filmesAnteriores.map(f => f.id === filmeRecebido.id ? filmeRecebido : f)
      );
    } else {
      setFilmes(filmesAnteriores => [...filmesAnteriores, filmeRecebido]);
    }
  };

  // Função DELETE corrigida para atualizar o estado em tempo real
  const excluirFilme = (idParaExcluir) => {
    Alert.alert(
      'Excluir Filme',
      'Tem certeza que deseja remover este filme do catálogo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive', 
          onPress: () => {
            setFilmes(filmesAnteriores => 
              filmesAnteriores.filter(filme => String(filme.id) !== String(idParaExcluir))
            );
          }
        }
      ]
    );
  };

  return (
    <LinearGradient colors={['#000000', '#1a0000', '#000000']} style={styles.container}>
      
      {/* Cabeçalho */}
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>🎬 Catálogo do Scherer</Text>
        <Text style={styles.headerSubtitle}>Seu acervo cinematográfico pessoal</Text>
      </View>

      {/* Botão de Cadastro (CREATE) */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('Form', { 
          atualizarLista: handleAtualizarLista 
        })}
      >
        <LinearGradient colors={['#ff1a1a', '#b30000']} style={styles.botaoAdicionar}>
          <Text style={styles.textoBotaoAdicionar}>+ Cadastrar Novo Filme</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Listagem (READ) */}
      <ScrollView contentContainerStyle={styles.listaContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.secaoTitulo}>Filmes Disponíveis</Text>
        
        {filmes.length === 0 ? (
          <Text style={styles.textoVazio}>Nenhum filme cadastrado no momento.</Text>
        ) : (
          filmes.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitulo}>{item.nome}</Text>
                <View style={styles.tagAno}>
                  <Text style={styles.textoAno}>{item.ano}</Text>
                </View>
              </View>

              <Text style={styles.cardGenero}>Gênero: {item.genero}</Text>
              <Text style={styles.cardSinopse} numberOfLines={3}>{item.sinopse}</Text>

              {/* Ações (UPDATE e DELETE) */}
              <View style={styles.cardAcoes}>
                {/* Botão de Editar (UPDATE) */}
                <TouchableOpacity 
                  style={styles.botaoEditar} 
                  onPress={() => navigation.navigate('Form', { 
                    filmeParaEditar: item,
                    atualizarLista: handleAtualizarLista
                  })}
                >
                  <Text style={styles.textoAcao}>Editar</Text>
                </TouchableOpacity>

                {/* Botão de Excluir (DELETE) */}
                <TouchableOpacity 
                  style={styles.botaoExcluir} 
                  onPress={() => excluirFilme(item.id)}
                >
                  <Text style={styles.textoAcaoExcluir}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerBox: { marginBottom: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#330000', paddingBottom: 12 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 1 },
  headerSubtitle: { fontSize: 14, color: '#ff4d4d', marginTop: 4 },
  botaoAdicionar: { padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 24, shadowColor: '#ff0000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 6 },
  textoBotaoAdicionar: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16, letterSpacing: 0.5 },
  secaoTitulo: { fontSize: 18, fontWeight: 'bold', color: '#ff4d4d', marginBottom: 14 },
  listaContainer: { paddingBottom: 20 },
  textoVazio: { color: '#888888', textAlign: 'center', marginTop: 30, fontStyle: 'italic', fontSize: 15 },
  card: { backgroundColor: 'rgba(20, 20, 20, 0.95)', padding: 18, borderRadius: 12, marginBottom: 16, borderLeftWidth: 5, borderLeftColor: '#ff0000', borderWidth: 1, borderColor: '#262626' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', flex: 1 },
  tagAno: { backgroundColor: '#330000', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: '#ff0000' },
  textoAno: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  cardGenero: { fontSize: 14, color: '#ff6666', marginBottom: 8, fontWeight: '600' },
  cardSinopse: { fontSize: 14, color: '#cccccc', lineHeight: 20, marginBottom: 14 },
  cardAcoes: { flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#262626', paddingTop: 10 },
  botaoEditar: { backgroundColor: '#262626', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6, marginRight: 10, borderWidth: 1, borderColor: '#404040' },
  botaoExcluir: { backgroundColor: 'rgba(153, 0, 0, 0.3)', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6, borderWidth: 1, borderColor: '#990000' },
  textoAcao: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  textoAcaoExcluir: { color: '#ff9999', fontSize: 12, fontWeight: 'bold' }
});