import asyncio

data = [(1,3),(1,6),(1,1),(1,4),(1,2)]

async def sum_square(nums):
    a,b = nums
    result = (a+b)**2
    print(f'Input {nums}')
    await asyncio.sleep(0)
    print(f'Output {result}!')
    return result


async def get_tasks():
    tasks = [asyncio.create_task(sum_square(nums)) for nums in data]
    await asyncio.wait(tasks)
    results = [task.result() for task in tasks]

    print(results)

def run():
    asyncio.run(get_tasks())

run()