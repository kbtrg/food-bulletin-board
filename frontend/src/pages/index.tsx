import Error from 'next/error';

const Home = ({ posts, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <div>
      <h1>POSTS</h1>
      <ul>
        {!posts
          ? null
          : posts.map((post, index) => {
            return <li key={index}>{post.title}</li>;
          })}
      </ul>
    </div>
  );
};

Home.getInitialProps = async (context) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CORE_URL}/posts`);
    const data = await res.json();
    
    return {
      posts: data.posts,
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
    };
  }
};

export default Home;