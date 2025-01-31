import Categories from '@/components/Categories'
import Hero from '@/components/Hero'

const Home = () => {
  return (
    <>
      <div className='w-full max-w-[1400px] mx-auto poppins-regular'>
        <Hero/>
        <Categories/>
        <div className='h-screen'></div>
      </div>
    </>
  )
}

export default Home