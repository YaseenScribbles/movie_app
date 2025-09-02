const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
import { Client, Databases, ID, Query } from "appwrite";

const client = new Client();
client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!);

const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID!, COLLECTION_ID!, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];     
      await databases.updateDocument(DATABASE_ID!, COLLECTION_ID!, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await databases.createDocument(
        DATABASE_ID!,
        COLLECTION_ID!,
        ID.unique(),
        {
          searchTerm: query,
          count: 1,
          movieId: movie.id,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

export const fetchTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!,
      COLLECTION_ID!,
      [Query.orderDesc("count"), Query.limit(5)]
    );
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
}
