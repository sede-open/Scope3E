import * as GlyphComponents from './index';
import { GlyphContainer, GlyphGrid } from './styledComponents';

export const Glyphs = () => {
  const components = Object.values(GlyphComponents);
  const filter = ['Svg'];

  return (
    <GlyphGrid>
      {components
        .filter((c) => 'name' in c && !filter.includes(c.name))
        .map((component) => {
          const displayName =
            'name' in component ? (component.name as string) : '';
          const Component = (component as unknown) as any;
          return (
            <GlyphContainer>
              <p>{displayName}</p>
              <div>
                <Component />
              </div>
            </GlyphContainer>
          );
        })}
    </GlyphGrid>
  );
};

export default {
  title: 'Glyphs',
  component: Glyphs,
};
