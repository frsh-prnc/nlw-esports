import { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';

import { THEME } from '../../theme';
import { styles } from './styles';

import { GameParams } from '../../@types/navigation';

import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function HandleGoBack(){
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.15.35:3333/games/:${game.id}/ads`)
    .then(response => response.json())
    .then(data => {console.log(data);});
  }, []);

  return (
    <Background>
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={HandleGoBack}>
        <Entypo 
        name="chevron-thin-left"
        color={THEME.COLORS.CAPTION_300}
        size={20}
        />
      </TouchableOpacity>

      <Image
      source={logoImg}
      style={styles.logo}
      />

<View style={styles.right}/>
    </View>
  
    <Image
    source={{ uri: game.bannerUrl }}
    style={styles.cover}
    resizeMode="cover"
    />

    <Heading 
    title={game.title}
    subtitle="Conecte-se e comece a jogar!"
    />

    <FlatList
    data={duos}
    keyExtractor= {item => item.id}
    renderItem= {({ item }) => (
    <DuoCard data={ item } />
      )}
    />

    </SafeAreaView>
    
    </Background>
 
  );
}