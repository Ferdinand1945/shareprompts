import Feed from "@components/Feed"
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
    Discover & Share
    <br className="max-md:hidden" />
    <span className="orange_gradient text-center">AI-Powered promt</span>
    </h1>
    <p className="mt-5 text-lg text-center">
        PromtAI is an open source project to discover and share ai prompts. <br /> Search by tag or content and visit the prompts creator profile to check their work!
    </p>

    <Feed />
    </section>
  )
}

export default Home