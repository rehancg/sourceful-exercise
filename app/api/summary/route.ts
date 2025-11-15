import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    {
      id: 'e63103c7-4a1a-4cf2-9641-f9fd16d5c354',
      name: 'AI image generation',
      thumbnailUrl:
        'https://cdn.sourceful.com/images/v1/a6ed1c63-309c-4b46-b834-03f5adf9f132.webp?b=spring-user-assets-prod&expiry=1764547200&w=400&h=400&t=false&signature=0s_ZgU0viAq3C318PzeCH8EQvL9CwX4few2j-_2fS14',
      numDesignRouteImages: 0,
      preauth: null,
    },
    {
      id: 'f80919cb-9d37-4019-8f20-dfa397d826ac',
      name: 'AI image generation',
      thumbnailUrl:
        'https://cdn.sourceful.com/images/v1/e7fa98b8-ff63-4353-91d1-3f2782694480.webp?b=spring-user-assets-prod&expiry=1764547200&w=400&h=400&t=false&signature=cbJ5oLw8HKNOS5axkYswzC9MySXd6hm_0e_6b311GkA',
      numDesignRouteImages: 1,
      preauth: null,
    },
    {
      id: 'e8fca1c8-f985-4792-b13f-15806402d90f',
      name: 'Bubble Bee Logo Design',
      thumbnailUrl:
        'https://cdn.sourceful.com/images/v1/866f9695-41f2-4d00-a2da-55a86cd0b9b7.webp?b=spring-user-assets-prod&expiry=1764547200&w=400&h=400&t=false&signature=QxGyxWriwYMEQHdF3gZMqmxPsS5GydiNhTKcKvIV9f8',
      numDesignRouteImages: 8,
      preauth: null,
    },
  ];

  return NextResponse.json({
    data,
    error: null,
  });
}

