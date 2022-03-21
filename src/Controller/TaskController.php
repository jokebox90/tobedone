<?php

namespace App\Controller;

use App\Entity\Task;
use App\Service\TaskService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/task')]
class TaskController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(TaskService $service): Response
    {
        return new JsonResponse($service->encodeTaskToJson(
            [ 'tasks' => $service->getAllTasksForAuthor( $this->getUser() ) ]
        ), 200, [], true);
    }

    #[Route('/new', name: 'app_new')]
    public function new(ManagerRegistry $doctrine): Response
    {
        return $this->render('task/new.html.twig', []);
    }
}
