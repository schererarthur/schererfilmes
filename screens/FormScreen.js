import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FormScreen({ route, navigation }) {
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [elenco, setElenco] = useState(''); // Novo estado para o elenco
  const [sinopse, setSinopse] = useState('');
  const [ano, setAno] = useState('');
  const [idEditando, setIdEditando] = useState(null);

  const params = route.params || {};
  const filmeParaEditar = params.filmeParaEditar;
  const atualizarLista = params.atualizarLista;

  useEffect(() => {
    if (filmeParaEditar) {
      setNome(filmeParaEditar.nome);
      setGenero(filmeParaEditar.genero);
      setElenco(filmeParaEditar.elenco || ''); // Carrega o elenco se estiver editando
      setSinopse(filmeParaEditar.sinopse);
      setAno(filmeParaEditar.ano);
      setIdEditando(filmeParaEditar.id);
    }
  }, [filmeParaEditar]);

  const salvar = () => {
    if (!nome || !genero || !elenco || !sinopse || !ano) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    if (idEditando) {
      const filmeAtualizado = { id: idEditando, nome, genero, elenco, sinopse, ano };
      if (atualizarLista) atualizarLista(filmeAtualizado, true);
      Alert.alert('Sucesso', 'Filme atualizado com sucesso!');
    } else {
      const novoFilme = {
        id: Date.now().toString(),
        nome,
        genero,
        elenco,
        sinopse,
        ano,
      };
      if (atualizarLista) atualizarLista(novoFilme, false);
      Alert.alert('Sucesso', 'Filme cadastrado com sucesso!');
    }

    navigation.goBack();
  };

  return (
    <LinearGradient colors={['#000000', '#1a0000', '#000000']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.tituloForm}>
          {idEditando ? '✏️ Editar Filme' : '➕ Novo Filme'}
        </Text>
        <Text style={styles.subtituloForm}>
          {idEditando ? 'Atualize os dados do registro' : 'Insira as informações no Catálogo do Scherer'}
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Filme</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Interestelar"
            placeholderTextColor="#666"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gênero</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Ficção Científica"
            placeholderTextColor="#666"
            value={genero}
            onChangeText={setGenero}
          />
        </View>

        {/* Novo campo para o Elenco */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Elenco Principal</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Matthew McConaughey, Anne Hathaway"
            placeholderTextColor="#666"
            value={elenco}
            onChangeText={setElenco}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sinopse</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escreva um breve resumo..."
            placeholderTextColor="#666"
            value={sinopse}
            onChangeText={setSinopse}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ano de Lançamento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 2014"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={ano}
            onChangeText={setAno}
          />
        </View>

        <TouchableOpacity onPress={salvar}>
          <LinearGradient colors={['#ff1a1a', '#b30000']} style={styles.botaoSalvar}>
            <Text style={styles.textoBotao}>
              {idEditando ? 'Salvar Alterações' : 'Cadastrar Filme'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  tituloForm: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4, textAlign: 'center' },
  subtituloForm: { fontSize: 13, color: '#ff4d4d', textAlign: 'center', marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  label: { color: '#cccccc', fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: 'rgba(20, 20, 20, 0.95)', color: '#FFFFFF', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#333333', fontSize: 15 },
  textArea: { height: 100, paddingTop: 12 },
  botaoSalvar: { padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 30, shadowColor: '#ff0000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 6 },
  textoBotao: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16, letterSpacing: 0.5 },
});