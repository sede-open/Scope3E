/* eslint-disable jsx-a11y/media-has-caption */
import Icon from 'components/Icon';
import { useRef, useState } from 'react';
import * as StyledComponents from './styledComponents';

type Props = {
  url: string;
  title?: string;
  type?: string;
};
export const Video = ({ url, title = 'SETH', type = 'video/mp4' }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlayClick = () => {
    setPlaying(true);
    videoRef.current?.play();
  };
  return (
    <>
      <video
        ref={videoRef}
        controls={playing}
        controlsList="noplaybackrate nodownload"
        title={title}
        width="100%"
      >
        <source src={url} type={type} />
      </video>
      {!playing && (
        <StyledComponents.PlayButton onClick={handlePlayClick}>
          <Icon src="/play.svg" alt="play" size="100%" />
        </StyledComponents.PlayButton>
      )}
    </>
  );
};
