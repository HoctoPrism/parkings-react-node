import React from "react";
import '../App.css';


function Home () {

  document.title = 'Page d\'accueil'

  return <div className="container">
      <div className="bg-clair rounded shadow alt-text-sombre">
        <div className="m-5">
          <h1 className="text-center py-3">Welcome</h1>
          <div className="row row-cols-2 d-flex justify-content-evenly align-items-center pb-5">
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, eius excepturi ipsum optio sit ipsam sapiente debitis ex iusto aliquam ullam ratione dignissimos nobis, consectetur quod quis placeat officiis! Est! Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, eius excepturi ipsum optio sit ipsam sapiente debitis ex iusto aliquam ullam ratione dignissimos nobis, consectetur quod quis placeat officiis! Est! Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, eius excepturi ipsum optio sit ipsam sapiente debitis ex iusto aliquam ullam ratione dignissimos nobis, consectetur quod quis placeat officiis! Est!</div>
            <img src="logo512.png" alt="gg" className="img-fluid w-25"></img>
          </div>
        </div>
      </div>
  </div>
}


export default Home;