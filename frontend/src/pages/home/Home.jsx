import { Outlet } from "react-router-dom"
import SideNav from "../../components/sidenav/SideNav"
import ProfileHeader from "../../components/profile/ProfileHeader"
import EditProfile from "../../components/profile/EditProfile"
import PageHeader from "../../components/main/PageHeader"




const Home = () => {
    

  return (
    <>
        <div className='h-screen w-screen grid grid-cols-[.6fr,3.8fr,2.5fr]'>
            {/* Left Panel */}
            <div className='h-full w-full flex flex-col items-end justify-between'>
                <SideNav />
            </div>

        {/* Center Panel */}
        <div className='flex overflow-scroll border-2 border-solid border-light-gray'>
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur eum doloribus aperiam praesentium repellat minima labore aliquam voluptatibus amet asperiores eligendi impedit dolor, accusamus rem quos ratione culpa autem laborum quas, ut ab mollitia harum! Ducimus totam modi dolorem illo at, perspiciatis ea temporibus praesentium magni natus maiores corrupti quia neque soluta molestiae possimus fugiat eius vel sed doloribus odio reiciendis amet dolorum! Illum nobis assumenda repellendus minus. Cum voluptatum ea, aliquid, quos iste nobis dicta similique harum ipsam culpa minus vel quo esse. Placeat dolore commodi dolorem, magni inventore dignissimos esse, odio officia voluptas aspernatur a facere ratione error eaque asperiores delectus iure eos culpa saepe beatae iste qui id. Debitis eum, aut nesciunt numquam saepe nihil labore optio, autem explicabo ipsam ipsum officiis blanditiis minus. Omnis molestiae aut doloribus nobis in dolores perspiciatis ea hic inventore nisi quas eveniet nam, ipsam itaque suscipit dolor quo ut odit veritatis quasi assumenda ratione debitis commodi ducimus. Perspiciatis eum rerum accusamus quod eaque, sint animi obcaecati eveniet dolor labore? Officiis iure, vitae esse sit nisi soluta architecto voluptates eveniet impedit est quibusdam. Beatae perferendis explicabo vero tempore doloribus nostrum tempora ullam deleniti quod velit. Et nihil architecto aspernatur, vel quo soluta, illo amet tenetur alias quas impedit voluptatibus, voluptate consequatur quasi reiciendis esse vitae perferendis facere laborum. Quaerat enim veniam, delectus doloremque, quod necessitatibus adipisci exercitationem facere voluptas numquam saepe deleniti quisquam quibusdam neque alias laboriosam explicabo iusto optio architecto ratione commodi repudiandae porro magnam dolor! Distinctio delectus atque mollitia dolorem eaque pariatur explicabo deleniti ducimus et ratione quas autem facere velit amet maxime neque, fugit ad maiores a quisquam magni, facilis incidunt sequi! Eaque praesentium repudiandae quas aliquam, mollitia minima tenetur iusto inventore eius delectus pariatur sit necessitatibus doloremque, atque deleniti ratione tempore fuga magni soluta provident odit commodi. Est nostrum, fugiat explicabo sint, architecto reiciendis autem quos excepturi, recusandae id dolores deleniti suscipit accusamus placeat fuga a. Omnis cumque voluptates tempora explicabo impedit fuga alias eveniet, porro magnam quos numquam ex voluptatem! Ducimus dignissimos cumque reprehenderit officia perferendis. Tenetur, possimus architecto maiores quod illo dignissimos deserunt ipsa eaque magni sunt vero quas odio enim, odit, velit ducimus qui exercitationem in quasi adipisci? Enim deserunt dolore quisquam saepe eius voluptatum amet, pariatur neque, sint fuga suscipit corporis! Necessitatibus tempore minus reprehenderit modi accusamus, nesciunt, itaque omnis voluptatem libero corporis quaerat tenetur neque quis alias delectus eaque cumque cum. Rem, assumenda. */}
            <Outlet />
        </div>
        

        {/* Right Panel */}
        <div className='flex'> Paramore and friends
            {/* <PageHeader /> */}
        </div>

    </div>
    </>
  )
}

export default Home