const MovieCard = ({ data }) => {
    return (
        <>
            <div className="card">
                <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="Avatar" style={{ "width": "100%" }} />
                <div className="container-chld">
                    <h4><b>{data?.title}</b></h4>
                    <span>{data?.overview.slice(0, 30)}...</span>
                </div>
            </div>
        </>
    )
}

export default MovieCard