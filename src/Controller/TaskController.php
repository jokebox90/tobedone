<?php

namespace App\Controller;

use App\Entity\Author;
use App\Entity\Task;
use App\Service\TaskService;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/task')]
class TaskController extends AbstractController
{
    #[Route(name: 'create_task', methods: ['POST'])]
    public function createTask(Request $request, TaskService $service, ManagerRegistry $doctrine): JsonResponse
    {
        $demouser = $doctrine
                ->getRepository( Author::class )
                ->findOneBy(['username' => 'demouser'])
            ;

        $taskData = $request->toArray();
        $dateNow = new DateTime();

        $newTask = new Task();
        $newTask
                ->setAuthor( $demouser )
                ->setTitle( $taskData['title'] )
                ->setDescription( $taskData['description'] )
                ->setStatus( 'created' )
                ->setCreatedAt( $dateNow )
                ->setModifiedAt( $dateNow )
            ;

        $doctrine
                ->getRepository( Task::class )
                ->add( $newTask, true )
            ;

        $nextUrl = $this->generateUrl('read_task', [ 'id' => $newTask->getId() ]);

        $response = new JsonResponse();
        return $response
                ->setData([ 'next' => $nextUrl ])
                ->setStatusCode( 201 )
            ;
    }

    #[Route(name: 'read_all_tasks', methods: ['GET'])]
    public function readAllTasks(TaskService $service, ManagerRegistry $doctrine): JsonResponse
    {
        $demouser = $doctrine
                ->getRepository( Author::class )
                ->findOneBy(['username' => 'demouser'])
            ;

        $allTasksForAuthor = [ 'tasks' => $service->getAllTasksForAuthor( $demouser ) ];

        $response = new JsonResponse();
        $response
                ->setJson( $service->encodeTaskToJson( $allTasksForAuthor ) )
                ->setStatusCode( 200 )
            ;

        return $response;
    }

    #[Route('/{id}', name: 'read_task', methods: ['GET'])]
    public function readTask(int $id, TaskService $service, ManagerRegistry $doctrine): JsonResponse
    {
        $task = $doctrine
                ->getRepository( Task::class )
                ->findOrNull($id)
            ;

        $response = new JsonResponse();
        if ( !$task ) {
            return $response
                    ->setStatusCode( 404 )
                    ->setData([ 'message' => 'Task not found.' ])
                ;
        }

        return $response
                ->setStatusCode( 200 )
                ->setJson( $service->encodeTaskToJson([ 'task' =>  $task ]) )
            ;
    }

    #[Route('/{id}', name: 'update_task', methods: ['PUT'])]
    public function updateTask(int $id, Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $repository = $doctrine->getRepository( Author::class );
        $demouser = $repository->findOneBy(['username' => 'demouser']);
        $task = $repository( Task::class ) ->find($id);

        if ( $task->getAuthor() != $demouser ) {
            return new JsonResponse('Forbidden', Response::HTTP_FORBIDDEN);
        }

        $taskData = $request->toArray();
        $dateNow = new DateTime();

        $task
                ->setAuthor( $demouser )
                ->setTitle( $taskData['title'] )
                ->setDescription( $taskData['description'] )
                ->setStatus( $taskData['status'] )
                ->setModifiedAt( $dateNow )
            ;

        $repository->add($task);
    }

    #[Route('/{id}', name: 'delete_task', methods: ['DELETE'])]
    public function deleteTask(ManagerRegistry $doctrine): JsonResponse
    {
        // ...
    }
}
