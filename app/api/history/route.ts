import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    history: [
      {
        id: 'bc27189d-d2b8-4289-8d6b-8f35bbafaf08',
        userId: '06914f34-4115-7c06-9d20-165193949dda',
        amount: -2,
        actionType: 'refine',
        status: 'completed',
        topUpId: null,
        metadata: {
          designActionId: '889aee24-925a-49a7-b428-4cb426e706d1',
        },
        createdAt: '2025-11-14T21:22:58.373Z',
        updatedAt: '2025-11-14T21:23:11.279Z',
      },
      {
        id: '8e5010f6-66e4-45cc-8ea3-4af4277910fe',
        userId: '06914f34-4115-7c06-9d20-165193949dda',
        amount: -2,
        actionType: 'image_generation',
        status: 'completed',
        topUpId: null,
        metadata: {
          designActionId: '67aca445-ba35-4318-ac22-615655d12b5a',
        },
        createdAt: '2025-11-12T21:22:45.176Z',
        updatedAt: '2025-11-12T21:23:02.034Z',
      },
      {
        id: 'abed97cd-853e-4a76-8b17-073bebac1f07',
        userId: '06914f34-4115-7c06-9d20-165193949dda',
        amount: -2,
        actionType: 'image_generation',
        status: 'completed',
        topUpId: null,
        metadata: {
          designActionId: 'fbf12f85-b554-46c6-af61-5e9033997fdb',
        },
        createdAt: '2025-11-12T21:15:12.721Z',
        updatedAt: '2025-11-12T21:15:31.891Z',
      },
      {
        id: '62522127-9c37-4754-ac73-c302c10b689c',
        userId: '06914f34-4115-7c06-9d20-165193949dda',
        amount: -18,
        actionType: 'image_generation',
        status: 'completed',
        topUpId: null,
        metadata: {
          designActionId: '7d9159cd-665e-4968-9628-a6d1f8ed8697',
        },
        createdAt: '2025-11-12T21:04:07.849Z',
        updatedAt: '2025-11-12T21:05:19.333Z',
      },
      {
        id: 'aed71651-1819-472a-8314-574539f9a9dd',
        userId: '06914f34-4115-7c06-9d20-165193949dda',
        amount: 40,
        actionType: 'bonus',
        status: 'completed',
        topUpId: null,
        metadata: null,
        createdAt: '2025-11-12T20:51:38.843Z',
        updatedAt: '2025-11-12T20:51:38.843Z',
      },
    ],
    totalEntries: '5',
  };

  return NextResponse.json({
    data,
    error: null,
  });
}

