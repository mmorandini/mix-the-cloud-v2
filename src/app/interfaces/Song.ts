export interface Song
{
	id: number,
	title: string,
	artist: string,
	streamUrl: string,
	provider: number,
	idFromProvider: string,
	duration: number,
	imageUrl: string,
	link: string,
  waveform_url: string,
  format: string
}
