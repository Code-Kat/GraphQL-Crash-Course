import React from "react";
import MainHero from "../components/MainHero/MainHero";
import CategoryDisplay from "../components/CategoryDisplay/CategoryDisplay";
import CardDisplay from "../components/CardDisplay/CardDisplay";
import { useQuery, useMutation, gql } from "@apollo/client";

const ANIMALS_QUERY = gql`
  {
    animals {
      image
      id
      title
      price
      slug
      image
    }
  }
`;

const ADD_ANIMAL_MUTATION = gql`
  mutation (
    $image: String!
    $category: String!
    $title: String!
    $stock: Int!
    $price: String!
    $description: [String!]!
    $rating: Float
    $slug: String!
  ) {
    addAnimal(
      image: $image
      category: $category
      title: $title
      description: $description
      stock: $stock
      price: $price
      rating: $rating
      slug: $slug
    ) {
      id
    }
  }
`;

//would be better to fetch categories here, but didn't for the sake of practice

function LandingPage() {
  const { loading, error, data } = useQuery(ANIMALS_QUERY);
  const [addAnimal] = useMutation(ADD_ANIMAL_MUTATION);

  if (loading) return <div>loading..</div>;

  if (error) return <div>error</div>;
  return (
    <div>
      <MainHero />
      <CategoryDisplay />
      <CardDisplay animals={data.animals} />
      <button
        onClick={() => {
          addAnimal({
            variables: {
              image: "ostrich",
              category: "1",
              title: "This is a really cool ostrich",
              description:
                "Very cool and friendly friend. Bad tempered but give them candy and they will cheer up and play and be fun",
              stock: 13,
              price: "32,234",
              rating: 3.6,
              slug: "ostrich",
            },
            refetchQueries: [{ query: ANIMALS_QUERY }],
          });
        }}
      >
        Add an Ostrich
      </button>
    </div>
  );
}

export default LandingPage;
