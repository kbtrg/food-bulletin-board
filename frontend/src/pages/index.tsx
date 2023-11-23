import useSWR from "swr"
import axios, { AxiosResponse } from "axios";
import { Fragment } from "react";

type ApiData = {
  posts: Post[]
}

type Post = {
  id: number
  title: string
  body: string
  created_at: string
  updated_at: string
}

const Home = () => {
  const { data: datas, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_CORE_URL}/posts`,
    fetcher<ApiData>
  )

  if (error) return <p>Failed to load.</p>
  if (isLoading) return <p>Loading...</p>
  if (!datas) return null

  return (
    <>
      {datas.posts.map((data, i) => (
        <Fragment key={i}>
          <p>id: {data.id}</p>
          <p>id: {data.title}</p>
          <p>id: {data.body}</p>
        </Fragment>
      ))}
    </>
  )
}

const fetcher = async <T,>(url: string): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await axios.get(url)
    return res.data
  } catch (e) {
    // axiosの型ガード
    if (axios.isAxiosError(e)) {
      if (e.response && e.response.status === 400) {
        // サーバーからのステータスコードがエラーの場合
        console.log("Response error:", e.response.data);
        console.log("Status code:", e.response.status);
      } else if (axios.isAxiosError(e) && e.request) {
        // リクエストが行われたが、サーバーからの応答がない場合
        console.log("No response received");
      } else {
        // リクエストがすら行われなかった場合
        console.log("Request error:", e.message);
      }
    }

    throw e
  }
}

export default Home;
