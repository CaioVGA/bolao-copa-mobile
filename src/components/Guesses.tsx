import { useState, useEffect } from 'react';
import { useToast, FlatList } from 'native-base';

import { api } from '../services/api';

import { Game, GameProps } from '../components/Game';
import { Loading } from './Loading';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');
  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);
    } catch (err) {
      console.log(err);

      toast.show({
        title: "Não foi possível carregar os jogos.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {

    try {
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        toast.show({
          title: "É necessário preencher todos os campos do palpite",
          placement: "top",
          bgColor: "red.500"
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      });

      toast.show({
        title: "Palpite enviado com sucesso!",
        placement: "top",
        bgColor: "green.500"
      });
      fetchGames();

    } catch (err) {
      console.log(err);

      toast.show({
        title: "Não foi possível enviar o palpite.",
        placement: "top",
        bgColor: "red.500"
      });
    }
    
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if(isLoading) {
    return <Loading />
  }

  return(
     <FlatList 
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game 
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
     />
  );
}
