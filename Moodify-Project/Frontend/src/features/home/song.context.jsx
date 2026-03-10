import { useState } from "react";
import { createContext } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/ochzwoeqp/moodify/songs/Kaho_Na_Kaho__-_With_Dialogue_-_PagalNew_vtXZo_vRP.mp3",
    posterUrl:
      "https://ik.imagekit.io/ochzwoeqp/moodify/posters/Kaho_Na_Kaho__-_With_Dialogue_-_PagalNew_UMcKiV2Vd.jpeg",
    title: "Kaho Na Kaho  - With Dialogue - PagalNew",
    mood: "happy",
  });

  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ loading, setLoading, song, setSong }}>
      {children}
    </SongContext.Provider>
  );
};
