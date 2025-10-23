export class DataBaseMemory{
    #videos = new Map();

    create(video){

        const id = crypto.randomUUID(); // Generate a unique ID for the video randomly (Universally Unique Identifier)

        this.#videos.set(id, video);
    }

    update(id, video){
        this.#videos.set(id, video);
    }

    delete(id){
        this.#videos.delete(id);
    }

    list(search){
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0];
            const data = videoArray[1];

            return { id,
                ...data
             };

        })
        .filter(video => {
            if(search){
                return video.title.includes(search)
            }
            return true;
        });
    }   
}    