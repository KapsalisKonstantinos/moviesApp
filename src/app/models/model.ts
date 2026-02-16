export interface Movie {
  id: string,
  movie_id: number,
  original_title: string,
  original_language: string,
  overview: string,
  popularity: number,
  poster_path: string,
  backdrop_path: string,
  release_date: string,
  vote_average: number,
  vote_count: number,
  adult: number,
  created_at: null,
  updated_at: null,
  casts: Cast[]
}

/**
 * Created 2 instances, to identify the one that matches the DTO, and the one that adds properties that are used locally.
 */
export interface Movie {
  favorite?: boolean
  deleted?: boolean
}

export interface Cast {
  id: string,
  movie_id: number,
  name: string,
  original_name: string,
  popularity: string,
  profile_path: string,
  character: string,
  created_at: string,
  updated_at: string
}
