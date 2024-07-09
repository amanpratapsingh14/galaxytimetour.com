import GalleryI from "@/components/Gallery";

const imageGrids = () => {
    return (
        <>
            <section id="home" className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
            
                <div className="wow fadeInUp mx-auto max-w-[800px] text-center" data-wow-delay=".2s">                  
                    <div className="container mx-auto py-8">
                        <div className="-mx-4 flex flex-wrap">
                            <div className="w-full px-4 ">
                                <GalleryI />      
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default imageGrids;