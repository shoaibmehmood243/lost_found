import React, { useState, useEffect } from 'react';
import { search } from '../assets';
import { Loader, Card, FormField } from "../components"

const RenderCards = ({ data, title }) => {
  if(data?.length > 0) {
    return data.map((post)=> <Card key={post?._id} {...post} />)
  } 

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(setSearchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(()=> {
        const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResults);
      }, 500)
    )
  }

  useEffect(()=> {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch('https://lost-found-nine.vercel.app/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if(response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div className='flex gap-6 items-center lg:flex-row flex-col'>
        <div>
          <h1 className="font-extrabold text-start text-[#222328] text-[32px]">Lost Things Info Listed here</h1>
        </div>
        <div>
          <img className='w-full h-60' src={search} />
        </div>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        { loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
                </h2>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No search result found"
                  />
                ) : (
                  <RenderCards
                    data={allPosts}
                    title="No post found"
                  />
                )}
              </div>
            </>
          )
        }
      </div>
    </section>
  )
}

export default Home;