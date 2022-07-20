// !STARTERCONF You can delete this page
import clsx from 'clsx';
import * as React from 'react';
import {
  SiGraphql,
  SiNextdotjs,
  SiReact,
  SiStrapi,
  SiTailwindcss,
} from 'react-icons/si';

import AnimateFade from '@/components/layout/AnimateFade';
import ArrowLink from '@/components/links/ArrowLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import Tooltip from '@/components/Tooltip';

const techs = [
  { icon: <SiNextdotjs />, key: 'next' },
  { icon: <SiReact />, key: 'react' },
  { icon: <SiGraphql />, key: 'graphql' },
  { icon: <SiTailwindcss />, key: 'tailwind' },
  { icon: <SiStrapi />, key: 'strapi' },
];

export default function AboutPage() {
  return (
    <AnimateFade>
      <Seo title='About' />

      <main>
        <section>
          <div className={clsx('layout flex min-h-[65vh] flex-col pt-10')}>
            <div>
              <ArrowLink direction='left' className='my-4 text-hl' href='/'>
                <span className='text-hl'>back to home</span>
              </ArrowLink>
            </div>
            <h1 className='text-hl'>about</h1>
            <div className='mt-4'>
              <p className='text-hl'>
                this app is a clone of{' '}
                <UnderlineLink
                  className='text-fg'
                  href='https://monkeytype.com'
                >
                  monkeytype
                </UnderlineLink>
              </p>
              <p className='my-4 text-hl'>technologies used:</p>
              <div className='flex gap-4 text-4xl text-hl'>
                {techs.map((tech) => (
                  <div className='group relative' key={tech.key}>
                    {tech.icon}
                    <Tooltip className='top-12 group-hover:translate-y-0 group-hover:opacity-100'>
                      {tech.key}
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
            <p className='flex flex-1 items-end text-hl'>
              - 12th of July, 2022
            </p>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
