import styled from "styled-components";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore"; // Removed startAfter import
import { db } from "../firebase.config";
import { toast } from "react-toastify";

import HouseItems from "../components/HouseItems";
import Spinner from "../components/Spinner";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "../components/Slider";

const ForContainer = styled.div`
  width: 100%;
`;

const ForWrapper = styled.div`
  padding: 0 25px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;

const ForWrapperh1 = styled.h1`
  margin: 10px 0 30px;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const For = () => {
  const params = useParams();
  const [houses, setHouses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        // Get reference
        const housesRef = collection(db, "houses");

        // Create a query
        const q = query(
          housesRef,
          where("forType", "==", params.forType),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // Execute query
        const querySnap = await getDocs(q);

        const houses = [];
        querySnap.forEach((doc) => {
          houses.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setHouses(houses);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch houses");
      }
    };
    fetchHouses();
  }, [params.forType]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <ForContainer>
      <Slider houses={houses} />
      <ForWrapper>
        <ForWrapperh1>For {params.forType}</ForWrapperh1>
        <HouseItems houses={houses} />
      </ForWrapper>
    </ForContainer>
  );
};

export default For;
