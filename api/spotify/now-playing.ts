import type { VercelRequest, VercelResponse } from '@vercel/node';

async function getSpotifyAccessToken() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Spotify environment variables are not fully configured.');
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh Spotify access token: ${response.statusText}`);
  }

  const data: any = await response.json();
  return data.access_token;
}

async function getRecentlyPlayed(accessToken: string) {
  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const data: any = await response.json();
  const track = data.items?.[0]?.track;
  if (!track) return null;

  const title = track.name;
  const artist = track.artists.map((_artist: any) => _artist.name).join(', ');
  const album = track.album.name;
  const albumImageUrl = track.album.images[0]?.url || '';
  const songUrl = track.external_urls.spotify;

  return {
    isPlaying: false,
    title,
    artist,
    album,
    albumImageUrl,
    songUrl,
  };
}

async function getNowPlaying() {
  const accessToken = await getSpotifyAccessToken();

  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log("Status:", response.status);

const text = await response.text();
console.log(text);

return {
  status: response.status,
  response: text,
};

  const song: any = await response.json();
  if (!song || !song.item) {
    return getRecentlyPlayed(accessToken);
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0]?.url || '';
  const songUrl = song.item.external_urls.spotify;

  return {
    isPlaying,
    title,
    artist,
    album,
    albumImageUrl,
    songUrl,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await getNowPlaying();
    if (!data) {
      throw new Error('No song found');
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      isPlaying: false,
      title: 'wy@',
      artist: 'Brent Faiyaz',
      album: 'Wasteland',
      albumImageUrl: '',
      songUrl: 'https://open.spotify.com',
      isPlaceholder: true,
    });
  }
}
